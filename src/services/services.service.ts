import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateServiceInput, UpdateServiceInput } from "./dto";
import { Services } from "./entities";

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Services)
        private readonly servicesRepository: Repository<Services>
    ) { }

    async create(input: CreateServiceInput): Promise<Services> {
        const service = this.servicesRepository.create(input)
        return await this.servicesRepository.save(service)
    }

    async find(where?: FindOptionsWhere<Services>): Promise<Services[]> {
        return await this.servicesRepository.find({ where })
    }

    async findOne(where: FindOptionsWhere<Services>): Promise<Services> {
        return await this.servicesRepository.findOne({ where })
    }

    async update(id: number, input: UpdateServiceInput): Promise<Services> {
        const service = await this.findOne({ id })
        if (!service) {
            throw new NotFoundException('Resource not found!')
        }
        await this.servicesRepository.update(id, input)
        return await this.findOne({ id })
    }

    async delete(id: number): Promise<boolean> {
        const service = await this.findOne({ id })
        if (!service) {
            throw new NotFoundException('Resource not found!')
        }
        await this.servicesRepository.delete(id)
        return true
    }


}