import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

app.enableCors({
  origin: [
    'https://frontend-task-manager-app-pi.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true,
});


  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: '/static/',
  });

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT, '0.0.0.0');
}

bootstrap();
