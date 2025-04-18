import { Module } from '@nestjs/common'
import { ServerRequestController } from './server-request.controller'
import { UserModule } from '@user/user.module'

@Module({
  imports: [UserModule],
  controllers: [ServerRequestController],
})
export class ServerRequestModule {}
