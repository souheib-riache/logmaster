import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Services } from "./entities";
import { ServicesResolver } from "./services.resolver";
import { ServicesService } from "./services.service";

@Module({
    imports: [TypeOrmModule.forFeature([Services])],
    providers: [ServicesResolver, ServicesService]
})
export class ServicesMudule { }