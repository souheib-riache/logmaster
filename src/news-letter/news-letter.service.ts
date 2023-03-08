import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsLetterInput } from './dto/create-news-letter.input';
import { NewsLetter } from './entities/news-letter.entity';

@Injectable()
export class NewsLetterService {
  constructor(
    @InjectRepository(NewsLetter)
    private readonly newsLetterRepository: Repository<NewsLetter>
  ) { }

  async create(createNewsLetterInput: CreateNewsLetterInput) {
    const newsLetterEmail = this.newsLetterRepository.create(createNewsLetterInput)
    return await this.newsLetterRepository.save(newsLetterEmail)
  }


  async findAll() {
    return await this.newsLetterRepository.find();
  }
}
