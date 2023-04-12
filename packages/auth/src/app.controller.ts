import { Body, Controller, Post, Query, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.appService.signUp(createUserDto);
  }

  @Get('callback')
  async callback(@Query('code') code: string) {
    // http://localhost:8080/realms/ordering/protocol/openid-connect/auth?response_type=code&client_id=ordering&redirect_uri=http://localhost:3002/auth/callback&scope=openid
    // http://localhost:3002/auth/callback?session_state=32e8d6de-4568-47d1-857e-b928e075401e&code=3f09ef04-d258-4cbe-af1c-29275c4a7aea.32e8d6de-4568-47d1-857e-b928e075401e.1cb06168-bfca-4deb-9567-4b21bd249493
    // http://localhost:8080/realms/ordering/protocol/openid-connect/logout
    return await this.appService.callback(code);
  }

  @Get("whoiam")
  async whoIAm(@Headers("Authorization") bearerToken: string) {
    const [, jwt] = bearerToken.split(" ");

    return await this.appService.whoIAm(jwt);
  }
}
