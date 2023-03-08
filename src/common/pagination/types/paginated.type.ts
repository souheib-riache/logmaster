import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IPaginatedType } from '../interfaces';

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
    @ObjectType({ isAbstract: true })
    abstract class PaginatedType implements IPaginatedType<T> {
        @Field(() => [classRef], { nullable: true })
        nodes: T[];

        @Field(() => Int)
        totalCount: number;

        @Field()
        hasNextPage: boolean;
    }
    return PaginatedType as unknown as Type<IPaginatedType<T>>;
}