import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async set(key: string, data: any, exp?: number) {
    await this.cache.set(key, data, exp);
  }

  async get(key: string) {
    return await this.cache.get(key);
  }
}
