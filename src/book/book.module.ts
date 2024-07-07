import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from './entities/book.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Show } from '../show/entities/show.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Book, Show])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}