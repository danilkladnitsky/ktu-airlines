import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from '@filters/http-exception.filter';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function runApi() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.APP_PORT);
}

runApi();
