import { Field, ObjectType } from '@nestjs/graphql';
import {
    BaseEntity as TypeOrmBaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class BaseEntity extends TypeOrmBaseEntity {
    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
