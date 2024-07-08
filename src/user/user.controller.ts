import { UserInfo } from 'src/utils/userInfo.decorator';

import { Body, Controller, Get, Post, UseGuards, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ResisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @Post('sign-up')
  async register(@Body() resisterDto: ResisterDto) {
    const newUser = await this.userService.register(resisterDto.email, resisterDto.password, resisterDto.rePassword, resisterDto.nickname, resisterDto.image, resisterDto.phone);
    return newUser;
  }

  // 로그인
  @Post('sign-in')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  // 프로필 조회
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getEmail(@UserInfo() user: User) {
    return ({ message: "프로필 조회에 성공했습니다.", user});
  }

  // 프로필 수정
  @UseGuards(AuthGuard('jwt'))
  @Patch('me')
  async patchUser(
    @UserInfo() user: User,
    @Body() patchData: { nickname: string, wallet: number, image: string, phone: string }
  ) {
    const patchedUser = await this.userService.patchUser(
      user.id,
      patchData.nickname,
      patchData.wallet,
      patchData.image,
      patchData.phone,
    )
    return ({ message: "프로필 수정에 성공했습니다.", patchedUser});
  }

}