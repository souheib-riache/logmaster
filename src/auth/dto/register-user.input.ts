import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
    @Field()
    email: string;

    @Field()
    password: string;

    @Field({ nullable: true })
    fullName?: string;
}
