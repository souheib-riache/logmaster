import { PartialType } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql/dist/decorators';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    id: number;
}
