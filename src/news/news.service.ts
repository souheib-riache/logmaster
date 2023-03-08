import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateNewsINput, UpdateNewsInput } from "./dto";
import { News } from "./entities";
import { PaginatedNews } from "./types";

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>
    ) { }

    async create(input: CreateNewsINput): Promise<News> {
        const news = this.newsRepository.create(input)
        return await this.newsRepository.save(news)
    }

    async find(where?: FindOptionsWhere<News>): Promise<News[]> {
        return await this.newsRepository.find({ where, relations: { picture: true } })
    }

    async findOne(where: FindOptionsWhere<News>): Promise<News> {
        return await this.newsRepository.findOne({ where, relations: { picture: true } })
    }

    async update(id: number, input: UpdateNewsInput): Promise<News> {
        const news = await this.findOne({ id })
        if (!news) {
            throw new NotFoundException('Resource not found!')
        }
        await this.newsRepository.update(id, input)
        return await this.findOne({ id })
    }

    async delete(id: number): Promise<boolean> {
        const news = await this.findOne({ id })
        if (!news) {
            throw new NotFoundException('Resource not found!')
        }
        await this.newsRepository.delete(id)
        return true
    }

    async paginatedNews(limit?: number, offset?: number): Promise<PaginatedNews> {
        const [nodes, totalCount] = await this.newsRepository.findAndCount({
            relations: {
                picture: true
            },
            take: limit,
            skip: offset,
            order: {
                createdAt: 'ASC'
            }
        })

        const hasNextPage = totalCount - (offset + limit) > 0;
        return { nodes, totalCount, hasNextPage };
    }


}