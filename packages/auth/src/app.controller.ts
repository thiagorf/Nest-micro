import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user/user.service';

@Controller('auth')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post('signin')
  async signIn(@Body() loginDto: LoginDto) {
    return await this.appService.signIn(loginDto);
  }

  @Post('signout')
  async signOut(@Req() req: Request) {
      const [, token] = req.headers.authorization.split(' ');
      return await this.appService.signOut(token);
  }
}
