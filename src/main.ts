import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      //conversion type
      /**used for string type to number type */
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  //swagger config
  const config = new DocumentBuilder()
    .setTitle('Centinel-API')
    .setDescription('User api url as localhost:8000')
    .setTermsOfService('http://localhost:8000')
    .addServer('http://localhost:8000')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.listen(8000);
}
bootstrap();
