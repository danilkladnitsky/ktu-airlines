import { UpdateEntity } from "@common/repository.types";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { AbstractRepository } from "./abstract.repository";
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "@entities/ticket.entity";
import { CreateTicketDto, TicketDto } from "@dtos/ticket.dto";

@Injectable()
export class TicketRepository implements AbstractRepository<Ticket, TicketDto> {
    constructor(@InjectRepository(Ticket) private readonly repository: Repository<Ticket>) { }

    async get(id: number): Promise<TicketDto> {
        return this.repository.findOne({ where: { id } });
    }

    async getAll(): Promise<TicketDto[]> {
        return this.repository.find()
    }

    async save(ticket: CreateTicketDto): Promise<TicketDto> {
        const result = await this.repository.save(ticket);
        return plainToInstance(TicketDto, result);
    }

    async update(ticket: UpdateEntity<TicketDto>) {
        const result = await this.repository.save(ticket);
        return plainToInstance(TicketDto, result);
    }

    async getBy(property: keyof Ticket, value: any) {
        const result = await this.repository.findOneBy({ [property]: value });

        if (!result) {
            return null;
        }

        return plainToInstance(TicketDto, result);
    }
}