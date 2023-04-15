import { User } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Role } from 'guards/roles.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { signJwt } from '@utils/jwt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private readonly repository: Repository<User>) { }

    async createJwtToken(user: User) {
        const payload = {
            role: Role.User,
            id: user.id
        }


        return signJwt(payload);
    }
}
