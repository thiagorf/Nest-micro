import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { OpenIdToken } from './interfaces/openid-token.interface';

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async signIn(loginDto: LoginDto) {}
  async signUp(createUserDto: CreateUserDto) {
    const token = await lastValueFrom(
      this.httpService
        .post(this.configService.get('KEYCLOAK_ACCESS_TOKEN'), {
          grant_type: 'client_credentials',
          client_id: this.configService.get('KEYCLOAK_CLIENT_ID'),
          client_secret: this.configService.get('KEYCLOAK_CLIENT_SECRET'),
        })
        .pipe(map((resp) => resp.data)),
    );

    const { email, name, password } = createUserDto;
    const user = await lastValueFrom(
      this.httpService
        .post<OpenIdToken>(
          this.configService.get('KEYCLOAK_USER_URI'),
          {
            email,
            firstName: name,
            username: email,
            enabled: true,
            credentials: [
              {
                type: 'password',
                value: password,
                temporary: false,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
            },
          },
        )
        .pipe(map((r) => r.data)),
    );
        return user;
  }
}
