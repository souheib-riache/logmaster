import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "src/common/base/entities";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('services')
@ObjectType()
export class Services extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    name: string

    @Field(() => [String])
    @Column('simple-array')
    items: string[]

}