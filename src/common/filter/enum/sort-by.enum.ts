import { registerEnumType } from '@nestjs/graphql';

export enum SortByEnum {
    DESC = 'DESC',
    ASC = 'ASC',
}

registerEnumType(SortByEnum, {
    description: 'The values for sort by date creation date ascending or descending',
    name: 'SortByEnum',
});