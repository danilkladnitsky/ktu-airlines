import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from 'filters/http-exception.filter';
import { AppModule } from './app.module';

async function runApi() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.APP_PORT);
}

runApi();
