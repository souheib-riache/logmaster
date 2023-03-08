import { Field, InputType } from '@nestjs/graphql';
import { SortByEnum } from './enum/sort-by.enum';
@InputType()
export class SortByFilterArgs {
    @Field(() => SortByEnum, { nullable: true, defaultValue: SortByEnum.ASC })
    createdAt: SortByEnum;

    @Field(() => SortByEnum, { nullable: false, defaultValue: SortByEnum.ASC })
    updatedAt: SortByEnum;

    @Field(() => SortByEnum, { nullable: false, defaultValue: SortByEnum.ASC })
    id: SortByEnum;
}