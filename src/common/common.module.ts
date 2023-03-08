import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/databse.module';
import { UploadModule } from './upload/upload.module';

@Module({
    imports: [GraphqlModule, ConfigModule, DatabaseModule, UploadModule],
    exports: [GraphqlModule, ConfigModule, DatabaseModule, UploadModule],
})
export class CommonModule { }
