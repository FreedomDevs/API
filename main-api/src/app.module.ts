import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { NewsModule } from './news/news.module'
import { GameDownloadModule } from './game-download/game-download.module'
import { ImagesController } from './images/images.controller'
import { ImagesModule } from './images/images.module'
import { SkinsModule } from './skins/skins.module'
import { ServerRequestModule } from './server-request/server-request.module'

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    NewsModule,
    GameDownloadModule,
    ImagesModule,
    SkinsModule,
    ServerRequestModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [ImagesController],
})
export class AppModule {}
