import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HomePageService } from './home-page.service';
import { HomePage } from './entities/home-page.entity';
import { CreateHomePageInput } from './dto/create-home-page.input';
import { UpdateHomePageInput } from './dto/update-home-page.input';

@Resolver(() => HomePage)
export class HomePageResolver {
  constructor(private readonly homePageService: HomePageService) { }

  @Mutation(() => HomePage)
  createHomePage(@Args('createHomePageInput') createHomePageInput: CreateHomePageInput) {
    return this.homePageService.create(createHomePageInput);
  }

  @Query(() => HomePage, { name: 'homePage' })
  findOne() {
    return this.homePageService.findOne();
  }

  @Mutation(() => HomePage)
  updateHomePage(@Args('updateHomePageInput') updateHomePageInput: UpdateHomePageInput) {
    return this.homePageService.update(updateHomePageInput);
  }

}
