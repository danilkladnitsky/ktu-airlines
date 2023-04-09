import { BotController } from '@controllers/bot.controller';
import { TicketController } from '@controllers/ticket.controller';
import { UserController } from '@controllers/user.controller';
import { Ticket } from '@entities/ticket.entity';
import { UserEntity } from '@entities/user.entity';
import { SocketGateway } from '@gateway/socket-gateway';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotService } from '@services/bot.service';
import { TicketService } from '@services/ticket.service';
import { UserService } from '@services/user.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [Ticket, UserEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController, UserController, TicketController, BotController],
  providers: [
    AppService,
    UserService,
    TicketService,
    BotService,
    SocketGateway,
  ],
})
export class AppModule {}
