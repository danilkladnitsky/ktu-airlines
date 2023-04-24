import { S3Module } from 'nestjs-s3';
import { BotController } from '@controllers/bot.controller';
import { TicketController } from '@controllers/ticket.controller';
import { UserController } from '@controllers/user.controller';
import { Ticket } from '@entities/ticket.entity';
import { User } from '@entities/user.entity';
import { BotGateway } from '@gateway/bot-gateway';
import { SocketGateway } from '@gateway/socket-gateway';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotService } from '@services/bot.service';
import { TicketService } from '@services/ticket.service';
import { UserService } from '@services/user.service';
import { TicketRepository } from 'repositories/ticket.repository';
import { UserRepository } from 'repositories/user.repository';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    S3Module.forRootAsync({
      useFactory: () => ({
        config: {
          accessKeyId: process.env.S3_ACCESS_KEY,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
          endpoint: process.env.S3_URL,
          region: "ru-1"
        },
      }),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [Ticket, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Ticket]),
  ],
  controllers: [AppController, UserController, TicketController, BotController],
  providers: [
    AppService,
    UserService,
    TicketService,
    BotService,
    UserRepository,
    TicketRepository,
    BotGateway
  ],
})
export class AppModule { }
