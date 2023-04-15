import { UpdateEntity } from "@common/repository.types";
import { ShareableUserDto } from "@dtos/user.dto";
import { User } from "@entities/user.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { AbstractRepository } from "./abstract.repository";
import { classToPlain, instanceToPlain, plainToClass, plainToInstance } from 'class-transformer';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(User) private readonly repository: Repository<User>) { }

    async save(user: User) {
        return await this.repository.save(user);
    }

    async getAll() {
        return await this.repository.find();
    }

    async getBy(property: keyof User, value: any): Promise<ShareableUserDto | null> {
        const result = await this.repository.findOneBy({ [property]: value });

        if (!result) {
            return null;
        }
        return result;
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
        return await this.repository.save(user);
    }

    async get(id: Id) {
        const result = await this.repository.findOne({ where: { id }, });

        return result;
    }
}