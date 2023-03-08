import { Field, ObjectType } from '@nestjs/graphql';
import { DeleteDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@ObjectType()
export class SoftDeleteBaseEntity extends BaseEntity {
    @Field({ nullable: true })
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt?: Date;
}
