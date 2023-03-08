import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Media } from 'src/common/media/entities';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('about_us')
export class AboutUs {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  content: string

  @Field(() => Media, { nullable: true })
  @OneToOne(() => Media, { onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true, nullable: true })
  @JoinColumn()
  image: Media


}
