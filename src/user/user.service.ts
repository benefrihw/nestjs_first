import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 회원가입
  async register(
    email: string,
    password: string,
    rePassword: string,
    nickname: string,
    image: string,
    phone: string,
  ) {
    // 이메일 중복 확인
    const existingEmail = await this.findByEmail(email);
    if (existingEmail) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    // 닉네임 중복 확인
    const existingNickname = await this.findByNickname(nickname);
    if (existingNickname) {
      throw new ConflictException('이미 존재하는 닉네임입니다.');
    }

    // 비밀번호 일치 여부 확인
    if (password !== rePassword) {
      throw new ConflictException('입력한 두 비밀번호가 일치하지 않습니다.');
    }

    // 비밀번호 해시화
    const hashedPassword = await hash(password, 10);
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      rePassword,
      nickname,
      image,
      phone,
    });
    
    // DB에 저장하기
    const saveUser = await this.userRepository.save(newUser);
    return ({ message: "회원가입에 성공했습니다",
      id: saveUser.id,
      email: saveUser.email,
      nickname: saveUser.nickname,
      image: saveUser.image,
      phone: saveUser.phone,
      wallet: saveUser.wallet,
      createdAt: saveUser.createdAt,
      updatedAt: saveUser.createdAt
    });
  }

  // 로그인
  async login(email: string, password: string) {
    // user 찾기
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    // 토큰 발급
    const payload = { email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // 프로필 수정
  async patchUser(
    id: number,
    nickname: string,
    wallet: number,
    image: string,
    phone: string,
  ) {
    // user 찾기
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new UnauthorizedException('일치하는 사용자가 없습니다.');
    }

    // DB에 업데이트 하기
    const updatedUser = await this.userRepository.update(
      { id },
      {
        nickname,
        wallet,
        image,
        phone,
      },
    );
    // 변경된 user 찾아서 반환
    return await this.userRepository.findOneBy({ id });
  }

  // email로 찾기
  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  // nickname으로 찾기
  async findByNickname(nickname: string) {
    return await this.userRepository.findOneBy({ nickname });
  }
}
