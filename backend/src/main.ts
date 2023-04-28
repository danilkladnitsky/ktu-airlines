import { NestFactory, Reflector } from '@nestjs/core';
import { HttpExceptionFilter } from '@filters/http-exception.filter';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function runApi() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix("api");

  await app.listen(process.env.APP_PORT);
}

runApi();
