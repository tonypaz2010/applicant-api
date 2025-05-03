import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

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
  await app.listen(process.env.PORT);
  //logger.log(`Corriendo en puerto: ${ process.env.PORT}`);
}
main();
