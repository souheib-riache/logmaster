import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateMediaInput, UpdateMediaInput } from './dto';
import { Media } from './entities/media.entity';

@Injectable()
export class MediaService {
    constructor(
        @InjectRepository(Media)
        private readonly mediaRepository: Repository<Media>,
    ) {}

    async create(input: CreateMediaInput) {
        const media = await this.mediaRepository.create(input);
        return await this.mediaRepository.save(media);
    }

    async findOne(criterias: any, relations?: any) {
        return await this.mediaRepository.findOne({
            where: criterias,
            relations: relations,
        });
    }

    async find(
        criteria?: any,
        relations?: any,
        offset?: number,
        limit?: number,
    ) {
        return await this.mediaRepository.find({
            where: criteria,
            relations: relations,
            take: limit,
            skip: offset,
        });
    }

    async findOneOrFail(criterias: any, relations?: any): Promise<Media> {
        const media = await this.findOne(criterias, relations);
        if (!media) throw new NotFoundException('Resource not found.');
        return media;
    }

    async getAll() {

        return await this.find();
    }

    async getOneById(id: number) {
        return await this.findOne({ id });
    }

    async fetchPaginated(
        criteria: any = {
            search: '',
        },
        relations?: any,
        offset?: number,
        limit?: number,
    ) {
        const { search, ...rest } = criteria;
        const [nodes, totalCount] = await this.mediaRepository.findAndCount({
            where: [
                { file_name: Like(`%${search}%`) },
                { original_name: Like(`%${search}%`) },
                ...rest,
            ],
            relations: relations,
            take: limit,
            skip: offset,
            
        });
        const hasNextPage = totalCount - (offset + limit) > 0;
        return { nodes, totalCount, hasNextPage };
    }

    async update(id: number, input: UpdateMediaInput) {
        if (input.file_name) {
            const extension = input.file_name.substring(
                input.file_name.lastIndexOf('.'),
                input.file_name.length,
            );
            input.file_name = input.file_name + extension;
        }
        const updateRes = await this.mediaRepository.update(id, input);
        if (updateRes.affected < 1)
            throw new NotFoundException('Resource not found.');

        return this.findOne(id);
    }

    async remove(id: number): Promise<boolean | NotFoundException> {
        const deleteRes = await this.mediaRepository.delete(id);
        if (deleteRes.affected < 1)
            throw new NotFoundException('Resource not found.');

        return true;
    }
}