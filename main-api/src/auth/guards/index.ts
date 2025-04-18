import { JwtAuthGuard } from './jwt-auth.guard'
import { RolesGuard } from '@auth/guards/role.guard'
import { ServerAccessGuard } from '@auth/guards/server-access.guard'

export const GUARDS = [JwtAuthGuard, RolesGuard, ServerAccessGuard]
