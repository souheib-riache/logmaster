import { Field, InputType, Int } from "@nestjs/graphql";
import { Media } from "src/common/media/entities";

@InputType()
export class CreateNewsINput {
    @Field()
    title: string

    @Field()
    subtitle: string

    @Field()
    article: string

    @Field(() => Int)
    picture: Media;
}