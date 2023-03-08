import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entities';

export const GqlCurrentUser = createParamDecorator<
    unknown,
    ExecutionContext,
    User
>((data: string | undefined, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    if (data) {
        return request.user[data];
    }
    return request.user;
});
