import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResisterDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호확인을 입력해주세요.' })
  rePassword: string;

  @IsString()
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  nickname: string;

  @IsString()
  @IsNotEmpty({ message: '프로필이미지를 입력해주세요.' })
  image: string;

  @IsString()
  @IsNotEmpty({ message: '연락처를 입력해주세요.' })
  phone: string;
}
