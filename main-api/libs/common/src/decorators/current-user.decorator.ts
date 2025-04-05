import { ExecutionContext } from '@nestjs/common';
import { IJwtPayload } from '@auth/interfaces';
import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (key: keyof IJwtPayload, ctx: ExecutionContext): IJwtPayload | Partial<IJwtPayload> => {
        const request = ctx.switchToHttp().getRequest();
        return key ? request.user[key] : request.user;
    },
);