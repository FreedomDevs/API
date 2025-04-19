import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common'
import { ServerAccessGuard } from '@auth/guards/server-access.guard'
import { UserService } from '@user/user.service'
import { CheckTokenDto } from './dto'
import { Public } from '@common/decorators'

@Public()
@UseGuards(ServerAccessGuard)
@Controller('server-request')
export class ServerRequestController {
  constructor(private readonly userService: UserService) {}

  @Get('get/user/:username')
  getUser(@Param('username') username: string) {
    return this.userService.findOne(username)
  }

  @Post('check/token')
  validToken(@Body() dto: CheckTokenDto) {
    if (!dto.token) {
      throw new NotFoundException(`Token not found`)
    }

    return this.userService.validToken(dto.token)
  }

  @Get('health')
  health() {
    return {
      online: true,
    }
  }
}
