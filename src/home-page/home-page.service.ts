import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHomePageInput } from './dto/create-home-page.input';
import { UpdateHomePageInput } from './dto/update-home-page.input';
import { HomePage } from './entities/home-page.entity';

@Injectable()
export class HomePageService {
  constructor(
    @InjectRepository(HomePage)
    private readonly homePageRepository: Repository<HomePage>
  ) { }

  async create(createHomePageInput: CreateHomePageInput) {
    const homePage = await this.findOne()
    if (homePage)
      return await this.update(createHomePageInput)
    const newHomePage = this.homePageRepository.create(createHomePageInput)
    return await this.homePageRepository.save(newHomePage)
  }


  async findOne() {
    const homePageInstance = await this.homePageRepository.find({ relations: { firstImage: true, secondImage: true } })
    if (homePageInstance.length < 1)
      return null
    return homePageInstance[0]
  }

  async update(updateHomePageInput: UpdateHomePageInput) {
    const homePage = await this.findOne()
    if (!homePage) {
      throw new NotFoundException('Resource not found')
    }
    await this.homePageRepository.update(homePage.id, updateHomePageInput)
    return await this.findOne()
  }

  remove(id: number) {
    return `This action removes a #${id} homePage`;
  }
}
