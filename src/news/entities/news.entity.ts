import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Media } from "src/common/media/entities";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('news')
@ObjectType()
export class News extends BaseEntity {
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
    @Column()
    article: string

    @Field(() => Media, { nullable: true })
    @OneToOne(() => Media, { onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true, nullable: true })
    @JoinColumn()
    picture: Media
}