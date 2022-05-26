import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { environment } from '@env/environment';

const isSwaggerEnabled = process.env.ENABLED_SWAGGER === 'true' || process.env.NODE_ENV == 'development';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable swagger for development
  if (isSwaggerEnabled) {
    const options = new DocumentBuilder()
      .setTitle('Todo app')
      .setDescription('Simple todo app')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(environment.swagger.path, app, document);
    Logger.log(`Swagger URL http://localhost:${environment.server.port}${environment.swagger.path}`);
  }

  // Start API server
  await app.listen(environment.server.port);
  Logger.log(`Start Listening http://localhost:${environment.server.port}`);
}

bootstrap();
