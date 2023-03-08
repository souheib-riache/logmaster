import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateUserInput, UpdateUserInput } from "./dto";
import { User } from "./entities";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) { }

    async create(input: CreateUserInput): Promise<User> {
        const user = this.usersRepository.create(input)
        return await this.usersRepository.save(user)
    }

    async find(where: FindOptionsWhere<User>): Promise<User[]> {
        return await this.usersRepository.find({ where })
    }

    async findOne(where: FindOptionsWhere<User>): Promise<User> {
        return await this.usersRepository.findOne({ where })
    }

    async update(id: number, input: UpdateUserInput): Promise<User> {
        const user = await this.findOne({ id })
        if (!user) {
            throw new NotFoundException('Resource not found!')
        }
        await this.usersRepository.update(id, input)
        return await this.findOne({ id })
    }

    async delete(id: number): Promise<boolean> {
        const user = await this.findOne({ id })
        if (!user) {
            throw new NotFoundException('Resource not found!')
        }
        await this.usersRepository.delete(id)
        return true
    }
}