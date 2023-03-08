import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async uploadMedia(@UploadedFile() image, @Body() body) {
        return await this.uploadService.uploadSingle(
            image,
            body?.path,
            body?.description,
        );
    }
}