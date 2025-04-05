import { Roles } from '@prisma/client';
export declare const ROLES_KEY = "roles";
export declare const Role: (...roles: Roles[]) => import("@nestjs/common").CustomDecorator<string>;
