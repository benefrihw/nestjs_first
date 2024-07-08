import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import {
  Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Query,
  BadRequestException,
  Patch
} from '@nestjs/common';

import { UpdateShowDto } from './dto/update-show.dto';
import { ShowService } from './show.service';
import { createShowDto } from './dto/create-show.dto';

@UseGuards(RolesGuard)
@Controller('shows')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  // 공연 목록 조회
  @Get()
  async getAllShows(
  ) {
    const allShow =  await this.showService.findAll();
    return ({ message: "공연 목록이 조회되었습니다", allShow })
  }

  // 공연 상세 조회
  @Get(':id')
  async getOneShow(@Param('id') id: number) {
    const oneShow =  await this.showService.findById(id);
    return ({ message: "공연이 조회되었습니다.", oneShow })
  }

  // 공연 검색
  @Get('show/search')
  async search(
    @Query('category') category?: string,
    @Query('title') title?: string,
  ) {
    if(category) {
      return await this.showService.searchCategory(category);
    } else if(title) {
      return await this.showService.searchTitle(title);
    }
    return [];
  }

  // 공연 등록
  @Roles(Role.Admin)
  @Post('/')
  async postShow(@Body() createShowDto: createShowDto) {
    const newShow = await this.showService.postShow(createShowDto.title, createShowDto.description, createShowDto.category, createShowDto.location, createShowDto.price, createShowDto.image, createShowDto.date, createShowDto.time, createShowDto.seat);
    return ({ message: "공연 등록이 완료되었습니다.", newShow })
  }

  // 공연 수정
  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateShowDto: UpdateShowDto) {
    const updatedShow = await this.showService.update(id, updateShowDto);
    return ({ message: "공연 수정이 완료되었습니다.", updatedShow })
  }

  // 공연 삭제
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.showService.delete(id);
    return ({ message: "공연 삭제가 완료되었습니다" });
  }
}