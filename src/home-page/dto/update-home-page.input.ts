import { CreateHomePageInput } from './create-home-page.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHomePageInput extends PartialType(CreateHomePageInput) {

}
