import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateMediaInput } from './create.media.input';

@InputType()
export class UpdateMediaInput extends PartialType(CreateMediaInput) {
  @Field(() => Int)
  id: number;
}