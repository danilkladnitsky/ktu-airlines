import { UpdateEntity } from "@common/repository.types";
import { ShareableUserDto } from "@dtos/user.dto";
import { User } from "@entities/user.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { AbstractRepository } from "./abstract.repository";
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserRepository implements AbstractRepository<User, ShareableUserDto> {
    constructor(@InjectRepository(User) private readonly repository: Repository<User>) { }

    async save(user: User) {
        const result = await this.repository.save(user);
        return plainToInstance(ShareableUserDto, result);
    }

    async getAll() {
        const result = await this.repository.find();
        return result.map(user => plainToInstance(ShareableUserDto, user));
    }

    async getBy(property: keyof User, value: any): Promise<ShareableUserDto | null> {
        const result = await this.repository.findOneBy({ [property]: value });

        if (!result) {
            return null;
        }
        return plainToInstance(ShareableUserDto, result);
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
        return plainToInstance(ShareableUserDto, result);
    }

    async get(id: Id) {
        const result = await this.getBy("id", id);
        return plainToInstance(ShareableUserDto, result);
    }
}