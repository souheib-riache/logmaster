import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateNewsINput } from "./create-news.input";

@InputType()
export class UpdateNewsInput extends PartialType(CreateNewsINput) {
    @Field(() => Int)
    id: number
}