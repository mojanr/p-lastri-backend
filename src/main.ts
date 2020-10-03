import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // config
  const configService = app.get(ConfigService);
  // prefix api
  app.setGlobalPrefix('api');
  // enable cors
  app.enableCors()

  // validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory: (errors) => {
      // console.log('error', errors[0].)
      // console.log('validation pipe', errors)
      return new BadRequestException(errors)
    },
  }));

  // serve app
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
