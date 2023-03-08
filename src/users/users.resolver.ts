import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './entities';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService
    ) { }
}