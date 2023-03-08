import { Module } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AboutUsResolver } from './about-us.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutUs } from './entities/about-us.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AboutUs])],
  providers: [AboutUsResolver, AboutUsService],
})
export class AboutUsModule { }
