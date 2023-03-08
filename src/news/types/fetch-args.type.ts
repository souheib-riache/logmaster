import { ArgsType, Field } from '@nestjs/graphql';
import { SortByFilterArgs } from '../../common/filter/order-options.args';
import { PaginationArgs } from '../../common/pagination/types';

@ArgsType()
export class FetchNewsArgs extends PaginationArgs {

    @Field(() => SortByFilterArgs, { nullable: true })
    sortBy?: SortByFilterArgs;
}
