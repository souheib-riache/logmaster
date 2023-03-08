import * as bcrypt from 'bcrypt';

import {
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenExpiredError } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities';
import { LoginUserInput, LoginUserPayload, RefreshTokenInput, RefreshTokenPayload, RegisterUserInput } from './dto';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from 'src/common/config';
import { User } from 'src/users/entities';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepository: Repository<RefreshToken>,
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) { }

    async generateToken(payload: any, secretKey: string, ttl: string) {
        return await this.jwtService.signAsync(payload, {
            secret: secretKey,
            expiresIn: ttl,
        });
    }



    async createAccount(input: RegisterUserInput) {
        const { email, password, ...clientData } = input;
        const hash = this.hash(password);

        const userInput = {
            email,
            password: hash,
            ...clientData,
        };

        const user = await this.usersService.create(userInput)

        return user;
    }


    async signup(input: RegisterUserInput) {


        const { email, password, ...clientData } = input;
        const hash = this.hash(password);

        const userInput = {
            email,
            password: hash,
            ...clientData,
        };

        const user = await this.usersService.create(userInput)
        return user;
    }





    async validateUser(email: string, pass: string) {
        const user = await this.usersService.findOne({
            email
        });
        if (user) {
            const { password, ...userData } = user;
            const passwordMatch = await bcrypt.compare(pass, password);
            if (passwordMatch) return user;
        }
        return null;
    }

    async createRefreshToken(user: Pick<User, 'id'>, ttl: number) {
        // ttl: Time to live (aka: expiresIn)
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + ttl);

        const refreshToken = this.refreshTokenRepository.create({
            user: user,
            expires: expirationDate,
        });
        return await this.refreshTokenRepository.save(refreshToken);
    }

    async generateAccessToken(user: any) {
        const payload = {
            sub: user.id,
            metadata: user.metadata,
        };
        return await this.jwtService.signAsync({ ...payload }, { expiresIn: '1m' });
    }

    async getUserId(token: string) {
        const tokenValidity = await this.jwtService.verifyAsync(token);
        if (!tokenValidity) {
            throw new UnprocessableEntityException('Invalid access token !');
        }
        return this.jwtService.decode(token);
    }

    async generateRefreshToken(user: any, expiresIn: number) {
        const payload = { sub: String(user.id), metadata: user.metadata };
        const refreshToken = await this.createRefreshToken(user, expiresIn);
        return await this.jwtService.signAsync({
            ...payload,
            expiresIn,
            jwtId: String(refreshToken.id),
        });
    }

    async resolveRefreshToken(encoded: string) {
        try {
            const payload = await this.jwtService.verify(encoded);
            if (!payload.sub || !payload.jwtId) {
                throw new UnprocessableEntityException(
                    'Invalid refresh token !',
                );
            }

            const refreshToken = await this.refreshTokenRepository.findOne({
                where: {
                    id: payload.jwtId,
                },
            });

            if (!refreshToken) {
                throw new UnprocessableEntityException(
                    'Refresh token not found.',
                );
            }

            if (refreshToken.isRevoked) {
                throw new UnprocessableEntityException(
                    'Refresh token revoked.',
                );
            }

            const user = await this.usersService.findOne({ id: payload.sub });

            if (!user) {
                throw new UnprocessableEntityException(
                    'Invalid refresh token !',
                );
            }

            return { user, payload };
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnprocessableEntityException('Refresh token expired');
            } else {
                throw new UnprocessableEntityException(
                    'Invalid refresh token !',
                );
            }
        }
    }

    async refreshAccessToken(refreshToken: string) {
        const { user, payload } = await this.resolveRefreshToken(refreshToken);
        const accessToken = await this.generateAccessToken({
            ...user,
            metadata: payload.metadata,
        });

        return {
            access_token: accessToken,
        };
    }

    async checkEmailAvailability(email: string) {
        const user = await this.usersService.findOne({

            email,

        });
        return user == null;
    }

    hash(password: string) {
        return bcrypt.hashSync(password, 10);
    }

    async authenticate(
        user: User,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        accessTtl?: number,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        refreshTtl?: number,
    ) {
        const accessToken = await this.generateAccessToken({
            ...user,
        });
        const refreshToken = await this.generateRefreshToken(
            { ...user },
            60 * 60 * 24 * 15,
        );

        const payload = new LoginUserPayload();
        payload.access_token = accessToken;
        payload.refresh_token = refreshToken;

        return payload;
    }

    async validate(email: string, password: string) {
        const user = await this.validateUser(email, password);
        if (user) {
            delete user.password;
            return user;
        }
        return null;
    }

    async login(input: LoginUserInput) {
        const { email, password } = input;

        const user = await this.validate(email, password);
        if (!user) {
            throw new ForbiddenException('email or password incorrect.');
        }


        const payload = await this.authenticate(user);
        return payload;
    }

    async refreshToken(input: RefreshTokenInput): Promise<RefreshTokenPayload> {
        const refreshToken = input.refresh_token;
        return await this.refreshAccessToken(refreshToken);
    }

    async resolveUser(token: string): Promise<User> {
        try {
            const decodedPayload = this.jwtService.verify(token);
            return await this.usersService.findOne({ id: decodedPayload.sub });
        } catch (error) {
            return null;
        }
    }
}
