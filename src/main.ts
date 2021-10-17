import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const PORT = config.get('app.port');
  const appName = config.get('app.name');
  const nodeEnv = config.get('app.node_env');
  const apiVersion = config.get('app.api_version');
  const corsAllowed = config.get('cors_allowed');
  const basePath = 'api';
  app.use(bodyParser.json({ limit: '50mb' }));
  app.setGlobalPrefix(`${basePath}/${apiVersion}`);

  const options = new DocumentBuilder()
    .setTitle(appName)
    .setDescription('Api Rest del sistema de pago de condominio Asovecib')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  app.enableCors({
    origin: corsAllowed,
  });

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

  SwaggerModule.setup(`api/${apiVersion}/api-docs`, app, document, { swaggerOptions: { displayRequestDuration: true } });

  await app.listen(PORT);
  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
