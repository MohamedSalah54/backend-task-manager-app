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
    'https://frontnext-p5yaau17e-mohamed-salah-eldins-projects.vercel.app', 
    'http://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
});


  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/',
  });

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT, '0.0.0.0'); 
}

bootstrap();
