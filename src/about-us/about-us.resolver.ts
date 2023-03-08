import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AboutUsService } from './about-us.service';
import { AboutUs } from './entities/about-us.entity';
import { CreateAboutUsInput } from './dto/create-about-us.input';
import { UpdateAboutUsInput } from './dto/update-about-us.input';

@Resolver(() => AboutUs)
export class AboutUsResolver {
  constructor(private readonly aboutUsService: AboutUsService) { }

  @Mutation(() => AboutUs)
  createAboutUs(@Args('createAboutUsInput') createAboutUsInput: CreateAboutUsInput) {
    return this.aboutUsService.create(createAboutUsInput);
  }


  @Query(() => AboutUs, { name: 'aboutUs' })
  findOne() {
    return this.aboutUsService.findOne();
  }

  @Mutation(() => AboutUs)
  updateAboutUs(@Args('updateAboutUsInput') updateAboutUsInput: UpdateAboutUsInput) {
    return this.aboutUsService.update(updateAboutUsInput);
  }
}
