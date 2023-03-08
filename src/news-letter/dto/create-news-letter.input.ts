import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNewsLetterInput {
  @Field(() => String)
  email: string;
}
