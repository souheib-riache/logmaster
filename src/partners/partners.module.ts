import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Partners } from "./entities";
import { PartnersResolver } from "./partners.resolver";
import { PartnersService } from "./partners.service";

@Module({
    imports: [TypeOrmModule.forFeature([Partners])],
    providers: [PartnersService, PartnersResolver]
})
export class PartnersModule { }