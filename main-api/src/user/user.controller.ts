import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
  Headers,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponse } from '@user/responses';
import { User } from '@prisma/client';
import { CurrentUser, Public } from '@common/decorators';
import { IJwtPayload } from '@auth/interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(@Body() dto) {
    const user = await this.userService.save(dto);

    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':idOrEmail')
  async findOneUser(@Param('idOrEmail') idOrEmail: string) {
    const user = await this.userService.findOne(idOrEmail);

    return new UserResponse(<User>user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('get/all')
  async findAllUser() {
    return await this.userService.getAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('get/me')
  async findMe(@Headers('Authorization') token: string) {
    if (!token) {
      throw new Error('Authorization token is missing');
    }

    if (token.startsWith('Bearer ')) {
      token = token.replace('Bearer ', '');
    }

    const profile = await this.userService.getMe(token);

    return new UserResponse(<User>profile);
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('get/token')
  validToken(@Headers('Authorization') token: string) {
    if (!token) {
      throw new Error('Authorization token is missing');
    }

    if (token.startsWith('Bearer ')) {
      token = token.replace('Bearer ', '');
    }

    return this.userService.validToken(token);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() uIDS: IJwtPayload,
  ) {
    const user = await this.userService.delete(id, uIDS);

    return new UserResponse(user);
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @Post('upload/avatar')
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: IJwtPayload,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    const avatarUrl = `/${file.filename}`;
    const updated = await this.userService.updateAvatar(user.id, avatarUrl); // Use user.id here

    return new UserResponse(updated);
  }
}
