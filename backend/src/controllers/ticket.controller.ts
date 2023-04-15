import { TicketDto } from '@dtos/ticket.dto';
import { BadRequestException, Controller, Get, Inject, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { TicketService } from '@services/ticket.service';
import { RolesGuard } from 'guards/role.guard';
import { Roles } from 'guards/roles';
import { Role } from 'guards/roles.enum';
import { UserRepository } from 'repositories/user.repository';

@Controller('tickets')
@UseGuards(RolesGuard)
export class TicketController {
  @Inject(UserRepository)
  private userRepository: UserRepository;

  @Inject(TicketService)
  private ticketService: TicketService;

  @Get()
  @Roles([Role.Admin])
  async getTickets() {
    return this.ticketService.getAll()
  }

  @Get(':userId')
  @Roles([Role.User, Role.Admin])
  async getTicketByUserId(@Param('userId') userId: number): Promise<TicketDto> {
    return this.ticketService.getTicketByUserId(userId);
  }

  @Post("invite-user/:vk_id")
  @Roles([Role.Admin])
  async inviteUser(@Param('vk_id') vkId: string) {
    if (!vkId) {
      throw new BadRequestException("Не указан vk_id");
    }

    const user = await this.userRepository.getBy("vkId", vkId);

    if (!user) {
      throw new NotFoundException("Такого пользователя нет");
    }

    this.ticketService.inviteUser(user);

  }

}
