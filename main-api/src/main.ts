import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
  });
  app.use('/game-download', (req, res, next) => {
    res.set('Connection', 'keep-alive');
    next();
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
