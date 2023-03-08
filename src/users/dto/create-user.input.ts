import { InputType } from "@nestjs/graphql/dist/decorators";

@InputType()
export class CreateUserInput {
    email: string;
    password: string;
    fullName?: string;
}
