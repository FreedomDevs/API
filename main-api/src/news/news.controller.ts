import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {NewsService} from "./news.service";
import {CreateNewsDto, UpdateNewsDto} from "./dto";
import {CurrentUser, Public, Role} from '@common/decorators';
import {RolesGuard} from "@auth/guards/role.guard";
import {Roles} from "@prisma/client";
import {IJwtPayload} from "@auth/interfaces";

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Post()
    create(@Body() createNewsDto: CreateNewsDto) {
        return this.newsService.create(createNewsDto);
    }

    @Public()
    @Get()
    findAll() {
        return this.newsService.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.newsService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.newsService.remove(+id);
    }

    // @Put(':id')
    // update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    //     return this.newsService.update(+id, updateNewsDto);
    // }

}
