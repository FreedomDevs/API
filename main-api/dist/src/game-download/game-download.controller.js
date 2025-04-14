"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDownloadController = void 0;
const common_1 = require("@nestjs/common");
const game_download_service_1 = require("./game-download.service");
const decorators_1 = require("../../libs/common/src/decorators");
let GameDownloadController = class GameDownloadController {
    constructor(gameDownloadService) {
        this.gameDownloadService = gameDownloadService;
    }
    async downloadGame(range, res) {
        const fileInfo = this.gameDownloadService.getFileInfo();
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileInfo.size - 1;
            res.status(206);
            res.set({
                'Content-Range': `bytes ${start}-${end}/${fileInfo.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': end - start + 1,
                'Content-Type': 'application/zip',
                'Cache-Control': 'no-cache',
            });
            this.gameDownloadService.createFileStream(start, end).pipe(res);
        }
        else {
            res.status(200);
            res.set({
                'Content-Length': fileInfo.size,
                'Content-Type': 'application/zip',
                'Cache-Control': 'no-cache',
            });
            this.gameDownloadService.createFileStream().pipe(res);
        }
    }
};
exports.GameDownloadController = GameDownloadController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('range')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GameDownloadController.prototype, "downloadGame", null);
exports.GameDownloadController = GameDownloadController = __decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Controller)('game-download'),
    __metadata("design:paramtypes", [game_download_service_1.GameDownloadService])
], GameDownloadController);
//# sourceMappingURL=game-download.controller.js.map