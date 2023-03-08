import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../common/pagination/types';
import { Partners } from '../entities';

@ObjectType()
export class PaginatedPartners extends Paginated(Partners) { }
