import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/common/config/config.module';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { RefreshToken } from './entities';
import { JwtStrategy } from './strategies';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_AUTH_KEY'),
                signOptions: { expiresIn: '30m' },

            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([RefreshToken]),
        UsersModule,
        ConfigModule,
    ],
    providers: [AuthService, JwtStrategy, AuthResolver],
    exports: [AuthService],
})
export class AuthModule { }
