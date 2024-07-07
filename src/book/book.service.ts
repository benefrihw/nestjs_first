import _ from 'lodash';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Book } from './entities/book.entity';
import { Show } from '../show/entities/show.entity'

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
  ) {}

  // 공연 예매하기
  async postBookByUserIdAndShowId(userId: number, showId: number) {
    const book = await this.bookRepository.save({
      user_id: userId,
      show_id: showId,
    });
    const bookedShow =  await this.showRepository.findOneById(showId);
    return ({ message: "공연 예매가 완료되었습니다",
      title: bookedShow.title,
      location: bookedShow.location,
      price: bookedShow.price,
      date: bookedShow.date,
      time: bookedShow.time
    })
  }

  // 예매 목록 가져오기
  async getMyBooks(userId: number) {
    const bookedShows =  await this.bookRepository.find({
      where: {
        user_id: userId
      },
      relations: ['show']
    })
    const myBookedShows = bookedShows.map(bookedShows => ({
      id: bookedShows.id,
      title: bookedShows.show.title,
      location: bookedShows.show.location,
      price: bookedShows.show.price,
      date: bookedShows.show.date,
      time: bookedShows.show.time
    }))

    myBookedShows.sort((a, b) => Number(a.date) - Number(b.date))
    return myBookedShows;
  }


  // async cancelBook(userId: number, bookId: number) {
  //   // await this.verifyMessage(userId, bookId);
  //   await this.bookRepository.delete({ bookId });
  // }

  // private async verifyMessage(userId: number, bookId: number) {
  //   const book = await this.bookRepository.findOneBy({
  //     userId,
  //     bookId
  //   });

  //   if (_.isNil(book) || book.user_id !== userId) {
  //     throw new NotFoundException(
  //       '메시지를 찾을 수 없거나 수정/삭제할 권한이 없습니다.',
  //     );
  //   }
  // }
}