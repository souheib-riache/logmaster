import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreatePartnerInput, UpdatePartnerInput } from "./dto";
import { Partners } from "./entities";
import { PartnersService } from "./partners.service";

@Resolver(() => Partners)
export class PartnersResolver {
    constructor(
        private readonly partnersService: PartnersService
    ) { }

    @Mutation(() => Partners, { name: 'createPartner' })
    async create(@Args('input', { type: () => CreatePartnerInput }) input: CreatePartnerInput): Promise<Partners> {
        return await this.partnersService.create(input)
    }

    @Mutation(() => Partners, { name: 'updatePartner' })
    async update(@Args('input', { type: () => UpdatePartnerInput }) input: UpdatePartnerInput): Promise<Partners> {
        return await this.partnersService.update(input.id, input)
    }

    @Mutation(() => Boolean, { name: 'deletePartner' })
    async delete(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
        return await this.partnersService.delete(id)
    }

    @Query(() => [Partners], { name: 'allPartners' })
    async findAll(): Promise<Partners[]> {
        return await this.partnersService.find()
    }

    @Query(() => Partners, { name: 'partnerById' })
    async findOne(@Args('id', { type: () => Int }) id: number): Promise<Partners> {
        return await this.partnersService.findOne({ id })
    }




}