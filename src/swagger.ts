import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication, config: ConfigService) => {
  const nodeEnv = config.get('app.node_env');
  const apiVersion = config.get('app');
  const appName = config.get('app.name');
  const corsAllowed = config.get('cors_allowed');

  const options = new DocumentBuilder()
    .setTitle(appName)
    .setDescription('Api Rest del sistema de pago de condominio Asovecib')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  app.enableCors({
    origin: corsAllowed,
  });

  SwaggerModule.setup(`api/${apiVersion}/api-docs`, app, document, { swaggerOptions: { displayRequestDuration: true } });
};
