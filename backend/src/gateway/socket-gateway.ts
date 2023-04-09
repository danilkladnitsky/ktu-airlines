import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayDisconnect,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'events', transports: ['websocket'] })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('EventsGateway');
  @WebSocketServer() wss: Server;

  afterInit(server: any) {
    this.logger.log('Initialize EventsGateway!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  sendToAll(msg: string) {
    this.wss.emit('alertToClient', { message: msg, type: 'events' });
  }
}
