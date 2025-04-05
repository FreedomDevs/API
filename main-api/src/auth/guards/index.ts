import {JwtAuthGuard} from "./jwt-auth.guard";
import {RolesGuard} from "@auth/guards/role.guard";

export const GUARDS = [JwtAuthGuard, RolesGuard];