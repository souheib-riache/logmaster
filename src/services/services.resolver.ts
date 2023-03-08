import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateServiceInput, UpdateServiceInput } from "./dto";
import { Services } from "./entities";
import { ServicesService } from "./services.service";

@Resolver(() => Services)
export class ServicesResolver {
    constructor(
        private readonly servicesService: ServicesService
    ) { }

    @Mutation(() => Services, { name: 'createService' })
    async create(@Args('input', { type: () => CreateServiceInput }) input: CreateServiceInput): Promise<Services> {
        return await this.servicesService.create(input)
    }

    @Mutation(() => Services, { name: 'updateService' })
    async update(@Args('input', { type: () => UpdateServiceInput }) input: UpdateServiceInput): Promise<Services> {
        return await this.servicesService.update(input.id, input)
    }

    @Mutation(() => Boolean, { name: 'deleteService' })
    async delete(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
        return await this.servicesService.delete(id)
    }

    @Query(() => [Services], { name: 'allServices' })
    async findAll(): Promise<Services[]> {
        return await this.servicesService.find()
    }

    @Query(() => Services, { name: 'serviceById' })
    async findOne(@Args('id', { type: () => Int }) id: number): Promise<Services> {
        return await this.servicesService.findOne({ id })
    }




}