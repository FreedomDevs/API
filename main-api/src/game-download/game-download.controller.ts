import { Controller, Get, Headers, Res } from '@nestjs/common';
import { GameDownloadService } from './game-download.service';
import { Response } from 'express';
import {Public} from "@common/decorators";

@Public()
@Controller('game-download')
export class GameDownloadController {
    constructor(private readonly gameDownloadService: GameDownloadService) {}

    @Get()
    async downloadGame(
        @Headers('range') range: string,
        @Res() res: Response
    ) {
        const fileInfo = this.gameDownloadService.getFileInfo();

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileInfo.size - 1;

            res.status(206);
            res.set({
                'Content-Range': `bytes ${start}-${end}/${fileInfo.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': (end - start + 1),
                'Content-Type': 'application/zip',
                'Cache-Control': 'no-cache'
            });

            this.gameDownloadService.createFileStream(start, end).pipe(res);
        } else {
            res.status(200);
            res.set({
                'Content-Length': fileInfo.size,
                'Content-Type': 'application/zip',
                'Cache-Control': 'no-cache'
            });

            this.gameDownloadService.createFileStream().pipe(res);
        }
    }

}
