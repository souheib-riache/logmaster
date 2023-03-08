import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { Media } from 'src/common/media/entities';
import { PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class CreateHomePageInput {

  @Field()
  title: string

  @Field()
  subtitle: string

  @Field()
  anouncementTitle: string

  @Field()
  anouncementDescription: string

  @Field(() => Int)
  firstImage: Media

  @Field(() => Int)
  secondImage: Media
}
