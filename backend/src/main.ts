import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { SystemLoggerService } from './custom-logger/system-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // config class-validatoin
  app.useGlobalPipes(new ValidationPipe());

  // // log setting
  // app.useLogger(app.get(SystemLoggerService));

  // config swagger
  const config = new DocumentBuilder()
    .setTitle('Sample Title')
    .setDescription('Sample description')
    .setVersion('1.0')
    // .addCookieAuth() cookie認証
    // .addBearerAuth() jwt認証
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
