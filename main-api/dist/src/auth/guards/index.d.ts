import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from '@auth/guards/role.guard';
export declare const GUARDS: (typeof JwtAuthGuard | typeof RolesGuard)[];
