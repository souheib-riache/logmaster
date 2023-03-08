import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NewsLetterService } from './news-letter.service';
import { NewsLetter } from './entities/news-letter.entity';
import { CreateNewsLetterInput } from './dto/create-news-letter.input';

@Resolver(() => NewsLetter)
export class NewsLetterResolver {
  constructor(private readonly newsLetterService: NewsLetterService) { }

  @Mutation(() => NewsLetter)
  createNewsLetter(@Args('createNewsLetterInput') createNewsLetterInput: CreateNewsLetterInput) {
    return this.newsLetterService.create(createNewsLetterInput);
  }

  @Query(() => [NewsLetter], { name: 'newsLetter' })
  findAll() {
    return this.newsLetterService.findAll();
  }
}
