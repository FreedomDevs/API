import { Injectable } from '@nestjs/common';
import { join } from 'path';
import {IFileInfo} from "./file-info.interface";
import { createReadStream, statSync } from 'fs';

@Injectable()
export class GameDownloadService {
    private readonly FILE_PATH = join(process.cwd(), 'game-storage', 'game.zip');

    getFileInfo(): IFileInfo {
        const stats = statSync(this.FILE_PATH);
        return {
            size: stats.size,
            lastModified: stats.mtime
        };
    }

    createFileStream(start?: number, end?: number) {
        return createReadStream(this.FILE_PATH, {
            start,
            end,
            highWaterMark: 1024 * 1024 // 1MB chunks
        });
    }

    private logDownloadSpeed(startTime: number, bytesSent: number) {
        const elapsed = (Date.now() - startTime) / 1000;
        const speed = (bytesSent / (1024 * 1024) / elapsed).toFixed(2);
        console.log(`Download speed: ${speed} MB/s`);
    }
}
