import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist";
import { User } from "./entities";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, UsersResolver],
    exports: [UsersService]
})
export class UsersModule { }