import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import { resolve } from 'path';
import { Public } from '@common/decorators';

@Public()
@Controller('images')
export class ImagesController {
  @Get(':imageName')
  getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    const imagePath = resolve('uploads', imageName);

    if (!fs.existsSync(imagePath)) {
      throw new NotFoundException('Image not found');
    }

    res.sendFile(imagePath);
  }
}
