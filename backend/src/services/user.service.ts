import { User } from '@entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Role } from 'guards/roles.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { signJwt } from '@utils/jwt';
import { UserRepository } from 'repositories/user.repository';
import { TicketRepository } from 'repositories/ticket.repository';

@Injectable()
export class UserService {
    @Inject(UserRepository)
    private readonly userRepository: UserRepository;

    @Inject(TicketRepository)
    private readonly ticketRepository: TicketRepository;

    async createJwtToken(user: User) {
        const payload = {
            role: Role.User,
            id: user.id
        }


        return signJwt(payload);
    }

    async getAcceptedUsers(): Promise<User[]> {
        const users = await this.userRepository.getAll();
                const tickets = await this.ticketRepository.getAll();

                return users
                    .filter(u => tickets
                        .find(t => t.userId === u.id && t.status === "accepted"));
    }
}
