import { IFileInfo } from './file-info.interface';
export declare class GameDownloadService {
    private readonly FILE_PATH;
    getFileInfo(): IFileInfo;
    createFileStream(start?: number, end?: number): import("fs").ReadStream;
    private logDownloadSpeed;
}
