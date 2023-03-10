import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('news_letter')
export class NewsLetter extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  email: string;
}
