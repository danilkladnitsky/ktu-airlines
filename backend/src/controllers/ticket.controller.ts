import { TicketDto } from '@dtos/ticket.dto';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('tickets')
export class TicketController {
  @Get(':userId')
  async getTicketByUserId(@Param('userId') userId: number): Promise<TicketDto> {
    return { status: 'accepted', userId: 1 };
  }
}
