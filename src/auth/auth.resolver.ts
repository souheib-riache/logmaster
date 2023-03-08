import {
    LoginUserInput,
    LoginUserPayload,
    RefreshTokenInput,
    RefreshTokenPayload,
    RegisterUserInput,
    RegisterUserPayload,
} from '../auth/dto';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';


import { User } from '../users/entities';
import { JwtAuthGuard } from './guards';


@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService,
    ) { }

    @Mutation(() => LoginUserPayload, { name: 'login' })
    login(@Args('input') input: LoginUserInput) {
        return this.authService.login(input);
    }

    @Mutation(() => RefreshTokenPayload, { name: 'refreshToken' })
    refreshToken(@Args('input') input: RefreshTokenInput) {
        return this.authService.refreshToken(input);
    }

    @Mutation(() => User, { name: 'signup' })
    async signup(@Args('input', { type: () => RegisterUserInput }) input: RegisterUserInput) {
        return await this.authService.signup(input)
    }
}
