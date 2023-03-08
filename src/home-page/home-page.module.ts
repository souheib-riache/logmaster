import { Module } from '@nestjs/common';
import { HomePageService } from './home-page.service';
import { HomePageResolver } from './home-page.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomePage } from './entities/home-page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomePage])],
  providers: [HomePageResolver, HomePageService],
})
export class HomePageModule { }
