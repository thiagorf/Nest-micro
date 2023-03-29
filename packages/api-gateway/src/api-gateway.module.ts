import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import type { RedisClientOptions } from 'redis';
import { ApiGatewayService } from './api-gateway.service';
import * as redisStore from 'cache-manager-redis-store';
import { JwtModule } from '@nestjs/jwt';
import { CacheService } from './cache.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './prisma/.env',
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        ORDERS_SERVICE_URI: Joi.string().required(),
      }),
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      host: 'localhost',
      port: 6637,
    }),
    JwtModule,
  ],
  providers: [ApiGatewayService, CacheService],
})
export class ApiGatewayModule {}
