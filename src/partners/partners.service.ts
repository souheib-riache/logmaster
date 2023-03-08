import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreatePartnerInput, UpdatePartnerInput } from "./dto";
import { Partners } from "./entities";

@Injectable()
export class PartnersService {
    constructor(
        @InjectRepository(Partners)
        private readonly partnersRepository: Repository<Partners>
    ) { }

    async create(input: CreatePartnerInput): Promise<Partners> {
        const partner = this.partnersRepository.create(input)
        return await this.partnersRepository.save(partner)
    }

    async find(where?: FindOptionsWhere<Partners>): Promise<Partners[]> {
        return await this.partnersRepository.find({ where, relations: { logo: true } })
    }

    async findOne(where: FindOptionsWhere<Partners>): Promise<Partners> {
        return await this.partnersRepository.findOne({ where, relations: { logo: true } })
    }

    async update(id: number, input: UpdatePartnerInput): Promise<Partners> {
        const partner = await this.findOne({ id })
        if (!partner) {
            throw new NotFoundException('Resource not found!')
        }
        await this.partnersRepository.update(id, input)
        return await this.findOne({ id })
    }

    async delete(id: number): Promise<boolean> {
        const partner = await this.findOne({ id })
        if (!partner) {
            throw new NotFoundException('Resource not found!')
        }
        await this.partnersRepository.delete(id)
        return true
    }


}