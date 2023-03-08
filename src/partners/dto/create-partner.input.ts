import { Field, InputType, Int } from "@nestjs/graphql";
import { Media } from "src/common/media/entities";

@InputType()
export class CreatePartnerInput {
    @Field()
    name: string

    @Field()
    link: string


    @Field(() => Int)
    logo: Media;
}