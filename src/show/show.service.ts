import _ from 'lodash';
import { parse } from 'papaparse';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateShowDto } from './dto/update-show.dto';
import { Show } from './entities/show.entity';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  // 모든 공연 찾기
  async findAll(): Promise<Show[]> {
    return await this.showRepository.find({
      select: ['id', 'title', 'date', 'time'],
    });
  }

  // id에 맞는 공연 찾기
  async findById(id: number) {
    return await this.verifyShowById(id);
  }

  // 공연 생성하기
  async postShow(
    title: string,
    description: string,
    category: string,
    location: string,
    price: number,
    image: string,
    date: string,
    time: string,
    seat: number,
  ) {
    // 제목 및 시간 중복 확인
    const existingShow = await this.findByTitleAndTime(title, date, time);
    if(existingShow) {
   
      throw new ConflictException('이미 등록된 공연입니다.');
    }

    // DB에 저장하기
    const newShow = this.showRepository.create({
      title,
      description,
      category,
      location,
      price,
      image,
      date,
      time,
      seat
    })
    return await this.showRepository.save(newShow);
  }

  // 공연 수정하기
  async update(id: number, updateShowDto: UpdateShowDto) {
    await this.verifyShowById(id);
    await this.showRepository.update({ id }, updateShowDto);
    return await this.showRepository.findOneById(id);
  }

  // 공연 삭제하기
  async delete(id: number) {
    await this.verifyShowById(id);
    await this.showRepository.delete({ id });
  }

  // id로 공연 찾기
  private async verifyShowById(id: number) {
    const show = await this.showRepository.findOneBy({ id });
    if (_.isNil(show)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return show;
  }

  // 제목, 시간으로 공연 찾기
  async findByTitleAndTime(title: string, date: string, time: string) {
    return await this.showRepository.findOneBy({ title, date, time });
  }

  // category로 공연 찾기
  async searchCategory(category: string) {
    return await this.showRepository.findBy({category});
  }

  // title로 공연 찾기
  async searchTitle(title: string) {
    return await this.showRepository.findBy({title});
  }
}