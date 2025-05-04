import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function main() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('main')

  app.setGlobalPrefix('api'),

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
    })
   );

   const config = new DocumentBuilder()
     .setTitle('JOBS RESTFul API')
     .setDescription('Jobs endpoints')
     .setVersion('1.0')
     .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);
 
  await app.listen(process.env.PORT);
  logger.log(`Corriendo en puerto: ${ process.env.PORT}`);
}
main();
