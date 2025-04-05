import { Module } from '@nestjs/common';
import { GameDownloadController } from './game-download.controller';
import { GameDownloadService } from './game-download.service';

@Module({
  controllers: [GameDownloadController],
  providers: [GameDownloadService]
})
export class GameDownloadModule {}
