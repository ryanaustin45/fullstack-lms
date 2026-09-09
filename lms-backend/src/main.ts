import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aktifkan validasi otomatis dari DTO (mirip Form Request di Laravel)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // buang field yang tidak ada di DTO
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();

  // Setup Swagger -> otomatis jadi dokumentasi API live
  const config = new DocumentBuilder()
    .setTitle('LMS API')
    .setDescription('API Documentation untuk LMS by Ryan Austin Andika')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
  console.log(`📚 API Docs tersedia di http://localhost:${port}/api/docs`);
}
bootstrap();
