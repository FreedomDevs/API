import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  app.use('/game-download', (req, res, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    res.set('Connection', 'keep-alive');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    next();
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
