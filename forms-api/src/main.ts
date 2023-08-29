import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    }));
    
  app.use(bodyParser.json({ limit: '10mb' })); // Example: 10MB limit
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
