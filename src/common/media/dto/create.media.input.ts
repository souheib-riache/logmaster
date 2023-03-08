import { Field, InputType } from '@nestjs/graphql';
import { MediaType } from '../enums/media.enum';

@InputType()
export class CreateMediaInput {
    @Field()
    original_name: string;

    @Field()
    file_name: string;

    @Field({ nullable: true })
    path: string;

    @Field()
    host: string;

    @Field()
    full_url: string;

    @Field(() => MediaType, { nullable: true })
    type: string;

    @Field({ nullable: true })
    alt: string;

}
