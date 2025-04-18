import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ServerAccessGuard } from '@auth/guards/server-access.guard'
import { UserService } from '@user/user.service'
import { CheckTokenDto } from './dto'

@UseGuards(ServerAccessGuard)
@Controller('server-request')
export class ServerRequestController {
  constructor(private readonly userService: UserService) {}

  @Post('check/token')
  validToken(@Body() dto: CheckTokenDto) {
    if (!dto.token) {
      throw new Error('Token is undefined')
    }

    return this.userService.validToken(dto.token)
  }
}
