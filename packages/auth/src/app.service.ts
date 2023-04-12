import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { OpenIdToken } from './interfaces/openid-token.interface';

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async callback(code: string) {
    const token = await lastValueFrom(
      this.httpService
        .post<OpenIdToken>(
          this.configService.get('KEYCLOAK_ACCESS_TOKEN'),
          {
            code,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:3002/auth/callback',
            client_id: this.configService.get('KEYCLOAK_CLIENT_ID'),
            cliebt_secret: this.configService.get('KEYCLOAK_CLIENT_SECRET'),
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
        .pipe(map((r) => r.data)),
    );

    return token;
  }

  async signUp(createUserDto: CreateUserDto) {
    const token = await lastValueFrom(
      this.httpService
        .post(
          this.configService.get('KEYCLOAK_ACCESS_TOKEN'),
          {
            grant_type: 'client_credentials',
            client_id: this.configService.get('KEYCLOAK_CLIENT_ID'),
            client_secret: this.configService.get('KEYCLOAK_CLIENT_SECRET'),
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
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
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(map((r) => r.data)),
    );
    return user;
  }

  async whoIAm(jwt: string) {
    const me = await lastValueFrom(
      this.httpService
        .get(
          'http://localhost:8080/admin/realms/ordering/protocol/openid-connect/userinfo',
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        )
        .pipe(map((r) => r.data)),
    );

    return me;
    
  }
}
