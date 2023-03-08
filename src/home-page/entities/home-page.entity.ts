import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Media } from 'src/common/media/entities';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('home_page')
export class HomePage extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  subtitle: string

  @Field()
  @Column({ name: 'anouncement_title' })
  anouncementTitle: string

  @Field()
  @Column({ name: 'anouncement_description' })
  anouncementDescription: string

  @Field(() => Media, { nullable: true })
  @OneToOne(() => Media, { onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true, nullable: true })
  @JoinColumn()
  firstImage: Media

  @Field(() => Media, { nullable: true })
  @OneToOne(() => Media, { onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true, nullable: true })
  @JoinColumn()
  secondImage: Media

}
