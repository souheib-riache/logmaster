import { CreateAboutUsInput } from './create-about-us.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAboutUsInput extends PartialType(CreateAboutUsInput) {

}
