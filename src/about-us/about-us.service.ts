import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAboutUsInput } from './dto/create-about-us.input';
import { UpdateAboutUsInput } from './dto/update-about-us.input';
import { AboutUs } from './entities/about-us.entity';

@Injectable()
export class AboutUsService {

  constructor(
    @InjectRepository(AboutUs)
    private readonly aboutUsRepository: Repository<AboutUs>
  ) { }

  async create(input: CreateAboutUsInput) {
    const aboutUs = await this.findOne()
    if (aboutUs)
      return await this.update(input)
    const newAboutUs = this.aboutUsRepository.create(input)
    return await this.aboutUsRepository.save(newAboutUs)
  }


  async findOne() {
    const aboutUsInstance = await this.aboutUsRepository.find({ relations: { image: true } })
    if (aboutUsInstance.length < 1)
      return null
    return aboutUsInstance[0]
  }

  async update(input: UpdateAboutUsInput) {
    const aboutUs = await this.findOne()
    if (!aboutUs) {
      throw new NotFoundException('Resource not found')
    }
    await this.aboutUsRepository.update(aboutUs.id, input)
    return await this.findOne()
  }
}
