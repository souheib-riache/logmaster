import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../common/pagination/types';
import { News } from '../entities';

@ObjectType()
export class PaginatedNews extends Paginated(News) { }
