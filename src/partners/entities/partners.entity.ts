import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "src/common/base/entities";
import { Media } from "src/common/media/entities";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('partners')
@ObjectType()
export class Partners extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    name: string

    @Field()
    @Column()
    link: string

    @Field(() => Media, { nullable: true })
    @OneToOne(() => Media, { onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true, nullable: true })
    @JoinColumn()
    logo: Media
}