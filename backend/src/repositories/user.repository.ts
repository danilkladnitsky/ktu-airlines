import { UpdateEntity } from "@common/repository.types";
import { UserDto } from "@dtos/user.dto";
import { User } from "@entities/user.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { AbstractRepository } from "./abstract.repository";
import { plainToClass, plainToInstance } from 'class-transformer';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserRepository implements AbstractRepository<User> {
    constructor(@InjectRepository(User) private readonly repository: Repository<User>) { }

    async save(user: User) {
        return await this.repository.save(user);
    }

    async delete(id: Id) {
        try {
            await this.repository.delete(id);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async update(user: UpdateEntity<User>) {
        const result = await this.repository.save(user);
        return result;
    }

    async get(id: Id) {
        const result = await this.repository.findOne({ where: { id } });
        return plainToInstance(User, result);
    }
}