import { Field, InputType, Int } from "@nestjs/graphql";
import { Media } from "src/common/media/entities";

@InputType()
export class CreateServiceInput {
    @Field()
    name: string

    @Field(() => [String])
    items: string[]
}