import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PaginationArgs } from "src/common/pagination/types";
import { CreateNewsINput, UpdateNewsInput } from "./dto";
import { News } from "./entities";
import { NewsService } from "./news.service";
import { PaginatedNews } from "./types";

@Resolver(() => News)
export class NewsResolver {
    constructor(
        private readonly newsService: NewsService
    ) { }

    @Mutation(() => News, { name: 'createNews' })
    async create(@Args('input', { type: () => CreateNewsINput }) input: CreateNewsINput): Promise<News> {
        return await this.newsService.create(input)
    }

    @Mutation(() => News, { name: 'updateNews' })
    async update(@Args('input', { type: () => UpdateNewsInput }) input: UpdateNewsInput): Promise<News> {
        return await this.newsService.update(input.id, input)
    }

    @Mutation(() => News, { name: 'deleteNews' })
    async delete(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
        return await this.newsService.delete(id)
    }

    @Query(() => [News], { name: 'allNews' })
    async findAll(): Promise<News[]> {
        return await this.newsService.find()
    }

    @Query(() => News, { name: 'newsById' })
    async findOne(@Args('id', { type: () => Int }) id: number): Promise<News> {
        return await this.newsService.findOne({ id })
    }

    @Query(() => PaginatedNews, { name: 'paginatedNews' })
    async getNews(
        @Args({ type: () => PaginationArgs }) args: PaginationArgs
    ): Promise<PaginatedNews> {
        const { limit, offset } = args
        const response = await this.newsService.paginatedNews(
            limit, offset);

        return <PaginatedNews>response
    }




}