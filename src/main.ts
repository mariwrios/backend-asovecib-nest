import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import generateTypeormConfigFile from './config/generateTypeOrmConfig';
import { initSwagger } from './swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get('app.port');
  const apiVersion = config.get('app.api_version');
  const basePath = 'api';

  generateTypeormConfigFile(config);
  initSwagger(app, config);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.setGlobalPrefix(`${basePath}/${apiVersion}`);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(PORT);
  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
