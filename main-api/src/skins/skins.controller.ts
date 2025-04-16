import {
  Controller,
  Get,
  Post,
  Param,
  Res,
  UploadedFile,
  UseInterceptors,
  Body,
  ParseBoolPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { SkinsService } from './skins.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'

@Controller('skins')
export class SkinsController {
  constructor(private readonly skinsService: SkinsService) {}

  @Post(':username/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSkin(@Param('username') username: string, @UploadedFile() file: Express.Multer.File) {
    return this.skinsService.uploadSkin(username, file)
  }

  @Get(':username')
  async getSkin(@Param('username') username: string, @Res() res: Response) {
    const { filePath, mimeType } = await this.skinsService.getSkinByName(username)
    res.setHeader('Content-Type', mimeType)
    res.sendFile(filePath)
  }

  @Get(':username/type')
  async getSkinType(@Param('username') username: string) {
    const type = await this.skinsService.getSkinTypeByName(username)
    return { type }
  }

  @Post(':username/type')
  @HttpCode(HttpStatus.NO_CONTENT)
  async setSkinType(
    @Param('username') username: string,
    @Body('type', ParseBoolPipe) type: boolean,
  ) {
    await this.skinsService.setSkinTypeByName(username, type)
  }
}
