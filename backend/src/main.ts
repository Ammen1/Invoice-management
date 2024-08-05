import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: 'https://lepton-games-onboarding-assessment-3.onrender.com/',
    credentials: true,
  });

  await app.listen(4000);
}
bootstrap();
