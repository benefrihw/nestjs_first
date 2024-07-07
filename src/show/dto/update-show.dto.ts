import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '공연 소개를 입력해주세요.' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: '공연 카테고리 입력해주세요.' })
  category: string;

  @IsString()
  @IsNotEmpty({ message: '공연 지역을 입력해주세요.' })
  location: string;

  @IsNumber()
  @IsNotEmpty({ message: '공연 가격을 입력해주세요.' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: '공연 포스터를 입력해주세요.' })
  image: string;

  @IsString()
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요.' })
  date: string;

  @IsString()
  @IsNotEmpty({ message: '공연 시간을 입력해주세요.' })
  time: string;


  @IsNumber()
  @IsNotEmpty({ message: '공연 좌석을 입력해주세요.' })
  seat: number;
}