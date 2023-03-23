import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CREDENTIALS_MISMATCH } from './constants/exceptions';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn(loginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(loginDto.email);

    const matchPassword = await compare(loginDto.password, user.password);

    if (!matchPassword) {
      throw new Error(CREDENTIALS_MISMATCH);
    }

    const token = this.jwtService.sign({
      sub: user.email,
    });

    return token;
  }

  async validateUser(token: string) {
    const decodedToken = this.jwtService.decode(token);
    //????
    const user = await this.userService.findUserByEmail(decodedToken.sub);
  }
}
