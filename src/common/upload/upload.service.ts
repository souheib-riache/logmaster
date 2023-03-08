import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { MinioService } from 'nestjs-minio-client';
import { MediaService } from '../media/media.service';
import { BufferedFile } from './interface/buffered-file.interface';

@Injectable()
export class UploadService {
    constructor(
        private readonly minioService: MinioService,
        private readonly configService: ConfigService,
        private readonly mediaService: MediaService,
    ) { }

    async defaultBucket(): Promise<string> {
        // ! next: get bucket name from store setting or global setting
        const allBuckets = await this.minioService.client.listBuckets();
        // return first bucket name if exists
        return this.configService.get('MINIO_BUCKET_NAME');
    }

    async uploadSingle(file: BufferedFile, path = '', alt = '') {
        const bucketName = await this.defaultBucket();

        if (
            !(
                file.mimetype.includes('jpeg') ||
                file.mimetype.includes('png') ||
                file.mimetype.includes('jpg') ||
                file.mimetype.includes('webp') ||
                file.mimetype.includes('svg+xml')
            )
        ) {
            throw new HttpException(
                'File type not supported',
                HttpStatus.BAD_REQUEST,
            );
        }

        const timestamp = Date.now().toString();
        const hashedFileName = crypto
            .createHash('md5')
            .update(timestamp)
            .digest('hex');
        const extension = file.originalname.substring(
            file.originalname.lastIndexOf('.'),
            file.originalname.length,
        );
        const metaData = {
            'Content-Type': file.mimetype,
        };

        // We need to append the extension at the end otherwise MinIo will save it as a generic file
        const fileName = hashedFileName + extension;

        // check existence of file
        const fileExists = await this.mediaService.findOne({
            file_name: fileName,
        });

        if (fileExists) {
            throw new HttpException(
                'File already exists',
                HttpStatus.BAD_REQUEST,
            );
        }

        const mediaMinIO = await this.minioService.client.putObject(
            bucketName,
            path + '/' + fileName,
            file.buffer,
            file.size,
            metaData,
        );

        if (!mediaMinIO)
            throw new HttpException(
                'Error uploading file',
                HttpStatus.BAD_REQUEST,
            );

        return await this.mediaService.create({
            original_name: file.originalname,
            file_name: fileName,
            host: await this.configService.get('MINIO_ENDPOINT'),
            path: `/${bucketName}/${path}`,
            full_url: `https://${await this.configService.get(
                'MINIO_ENDPOINT',
            )}/${bucketName}/${path}/${fileName}`,
            alt,
            type: file.fieldname,
        });
    }

    // ! not complete
    async moveTo(source, target) {
        const bucketName = await this.defaultBucket();
        try {
            await this.minioService.client.copyObject(
                bucketName,
                source,
                `/${target}`,
                null,
                async (err) => {
                    if (err) {
                        throw new HttpException(
                            'Error uploading file',
                            HttpStatus.BAD_REQUEST,
                        );
                    }
                },
            );
        } catch (err) {
            console.log(err);
            throw new NotFoundException('error not expected');
        }

        return true;
    }

    async delete(objetName: string) {
        const bucketName = await this.defaultBucket();
        try {
            await this.minioService.client.removeObject(bucketName, objetName);
        } catch (err) {
            console.log(err);
            throw new NotFoundException('error not expected');
        }
    }
}
