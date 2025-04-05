"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDownloadService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs_1 = require("fs");
let GameDownloadService = class GameDownloadService {
    constructor() {
        this.FILE_PATH = (0, path_1.join)(process.cwd(), 'game-storage', 'game.zip');
    }
    getFileInfo() {
        const stats = (0, fs_1.statSync)(this.FILE_PATH);
        return {
            size: stats.size,
            lastModified: stats.mtime
        };
    }
    createFileStream(start, end) {
        return (0, fs_1.createReadStream)(this.FILE_PATH, {
            start,
            end,
            highWaterMark: 1024 * 1024
        });
    }
    logDownloadSpeed(startTime, bytesSent) {
        const elapsed = (Date.now() - startTime) / 1000;
        const speed = (bytesSent / (1024 * 1024) / elapsed).toFixed(2);
        console.log(`Download speed: ${speed} MB/s`);
    }
};
exports.GameDownloadService = GameDownloadService;
exports.GameDownloadService = GameDownloadService = __decorate([
    (0, common_1.Injectable)()
], GameDownloadService);
//# sourceMappingURL=game-download.service.js.map