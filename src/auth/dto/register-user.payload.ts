import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterUserPayload {
    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    message: string;
}
