import { Module } from '@nestjs/common'
import { SkinsService } from './skins.service'
import { SkinsController } from './skins.controller'
import { PrismaModule } from '@prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [SkinsService],
  controllers: [SkinsController],
})
export class SkinsModule {}
