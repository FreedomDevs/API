"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GUARDS = void 0;
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const role_guard_1 = require("./role.guard");
exports.GUARDS = [jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard];
//# sourceMappingURL=index.js.map