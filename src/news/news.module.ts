import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { News } from "./entities";
import { NewsResolver } from "./news.resolver";
import { NewsService } from "./news.service";

@Module({
    imports: [TypeOrmModule.forFeature([News])],
    providers: [NewsService, NewsResolver]
})
export class NewsModule { }