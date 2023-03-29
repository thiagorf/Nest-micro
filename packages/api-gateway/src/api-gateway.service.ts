import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { v4 } from 'uuid';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    private jwt: JwtService,
  ) {}

  async signOut(token: string) {
    const decodedToken = this.jwt.decode(token);
    console.log(decodedToken);
  }
}
