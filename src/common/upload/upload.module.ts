import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule } from '../config/config.module';
import { MediaModule } from '../media/media.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
    imports: [
        MinioModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                endPoint: configService.get('MINIO_ENDPOINT'),
                port: parseInt(configService.get('MINIO_PORT'), 10),
                useSSL: false,
                accessKey: configService.get('MINIO_ACCESS_KEY'),
                secretKey: configService.get('MINIO_SECRET_KEY'),
            }),
            inject: [ConfigService],
        }),
        ConfigModule,
        MediaModule,
    ],
    providers: [UploadService],
    controllers: [UploadController],
})
export class UploadModule {}
