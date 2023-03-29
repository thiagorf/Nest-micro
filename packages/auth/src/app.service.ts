import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CREDENTIALS_MISMATCH } from './constants/exceptions';
import { v4 } from 'uuid';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async signIn(loginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(loginDto.email);

    const matchPassword = await compare(loginDto.password, user.password);

    if (!matchPassword) {
      throw new Error(CREDENTIALS_MISMATCH);
    }

    const token = this.jwtService.sign(
      {
        sub: user.email,
      },
      {
        jwtid: v4(),
        expiresIn: '5m',
      },
    );

    return token;
  }

  async signOut(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token);
      console.log(decodedToken);

      return {
        isIssued: true,
        token: decodedToken,
      };
    } catch (e) {
      return {
        isIssued: false,
        token: null,
      };
    }

    //TODO add revoked token in the backlist
  }

  async validateUser(token: string) {
    const decodedToken = this.jwtService.decode(token);
    //????
    const user = await this.userService.findUserByEmail(decodedToken.sub);
  }
}
