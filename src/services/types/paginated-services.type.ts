import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../common/pagination/types';
import { Services } from '../entities';

@ObjectType()
export class PaginatedServices extends Paginated(Services) { }
