import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/api-gateway/prisma/.env',
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        ORDERS_SERVICE_URI: Joi.string().required(),
      }),
    }),
  ],
})
export class ApiGatewayModule {}
