import { IJwtPayload } from '@auth/interfaces';
export declare const CurrentUser: (...dataOrPipes: (keyof IJwtPayload | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
