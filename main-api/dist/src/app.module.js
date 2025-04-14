"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const core_1 = require("@nestjs/core");
const news_module_1 = require("./news/news.module");
const game_download_module_1 = require("./game-download/game-download.module");
const images_controller_1 = require("./images/images.controller");
const images_module_1 = require("./images/images.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            news_module_1.NewsModule,
            game_download_module_1.GameDownloadModule,
            images_module_1.ImagesModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
        controllers: [images_controller_1.ImagesController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map