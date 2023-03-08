import { InputType, Int, Field } from '@nestjs/graphql';
import { Media } from 'src/common/media/entities';

@InputType()
export class CreateAboutUsInput {
  @Field()
  title: string

  @Field()
  content: string

  @Field(() => Int)
  image: Media
}
