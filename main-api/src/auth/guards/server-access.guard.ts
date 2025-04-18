import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class ServerAccessGuard implements CanActivate {
  private readonly serverToken: string = 'server-token'

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const serverToken = request.headers['server-authorization']

    if (!serverToken) {
      throw new UnauthorizedException('Server token is missing')
    }

    if (serverToken !== this.serverToken) {
      throw new UnauthorizedException('Invalid server token')
    }

    return true
  }
}
