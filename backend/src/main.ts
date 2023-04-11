import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from '@filters/http-exception.filter';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import VkBot from 'node-vk-bot-api';

async function runApi() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new HttpExceptionFilter());

const bot = new VkBot({
  token: process.env.BOT_TOKEN,
  confirmation: process.env.CONFIRMATION,
});

bot.on((ctx) => {
  ctx.reply('Hello!');
});

  
  await app.listen(process.env.APP_PORT);
}

runApi();
