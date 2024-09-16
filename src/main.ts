import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AdminGuard } from './auth/guards/admin.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  const adminGuard = app.get(AdminGuard);
  app.useGlobalGuards(adminGuard);
  await app.listen(3000);
}
bootstrap();
