import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { NewsModule } from './news/news.module';
import { PartnersModule } from './partners/partners.module';
import { ServicesMudule } from './services/service.module';
import { UsersModule } from './users/users.module';
import { NewsLetterModule } from './news-letter/news-letter.module';
import { HomePageModule } from './home-page/home-page.module';
import { AboutUsModule } from './about-us/about-us.module';

@Module({
  imports: [UsersModule, CommonModule, AuthModule, NewsModule, PartnersModule, ServicesMudule, NewsLetterModule, HomePageModule, AboutUsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
