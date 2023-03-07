import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, {
    bodyParser: false,
  });
  const configService = app.get(ConfigService);

  app.use(
    '/orders',
    createProxyMiddleware({
      target: 'http://orders:3001',
      secure: false,
      changeOrigin: true,
    }),
  );

  await app.listen(configService.get('PORT'));
}
bootstrap();
