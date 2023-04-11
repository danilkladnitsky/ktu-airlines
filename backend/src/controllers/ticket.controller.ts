import { TicketDto } from '@dtos/ticket.dto';
import { Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { BotService } from '@services/bot.service';
import { TicketService } from '@services/ticket.service';
import { TicketRepository } from 'repositories/ticket.repository';
import { UserRepository } from 'repositories/user.repository';

@Controller('tickets')
export class TicketController {
  constructor(
    private userRepository: UserRepository,
  private ticketService: TicketService) {
  }

  @Get(':userId')
  async getTicketByUserId(@Param('userId') userId: number): Promise<TicketDto> {
    return { status: 'accepted', userId: 1, id: 1 };
  }

  @Post("invite-user/:vk_id")
  async inviteUser(@Param('vk_id') vkId: number) { 
    const user = await this.userRepository.getBy("vkId", vkId);

    if (!user) {
      throw new NotFoundException("Такого пользователя нет");
    }

    this.ticketService.inviteUser(user);

  }

}
