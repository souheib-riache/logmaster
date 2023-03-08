import { Module } from '@nestjs/common';
import { NewsLetterService } from './news-letter.service';
import { NewsLetterResolver } from './news-letter.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsLetter } from './entities/news-letter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsLetter])],
  providers: [NewsLetterResolver, NewsLetterService]
})
export class NewsLetterModule { }
