import { GameDownloadService } from './game-download.service';
import { Response } from 'express';
export declare class GameDownloadController {
    private readonly gameDownloadService;
    constructor(gameDownloadService: GameDownloadService);
    downloadGame(range: string, res: Response): Promise<void>;
}
