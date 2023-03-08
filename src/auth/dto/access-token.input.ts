import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AccessTokenInput {
    @Field()
    access_token: string;
}
