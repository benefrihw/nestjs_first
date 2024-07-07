import { IsNotEmpty, IsString, IsNumber, } from 'class-validator';

export class createShowDto {
  @IsString()
  @IsNotEmpty({ message: '타이틀을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '설명을 입력해주세요.' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: '카테고리를 입력해주세요.' })
  category: string;

  @IsString()
  @IsNotEmpty({ message: '지역을 입력해주세요.' })
  location: string;

  @IsNumber()
  @IsNotEmpty({ message: '가격를 입력해주세요.' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: '포스터를 입력해주세요.' })
  image: string;

  @IsString()
  @IsNotEmpty({ message: '날짜를 입력해주세요.' })
  date: string;

  @IsString()
  @IsNotEmpty({ message: '시간을 입력해주세요.' })
  time: string;

  @IsNumber()
  @IsNotEmpty({ message: '좌석을 입력해주세요.' })
  seat: number;
}
