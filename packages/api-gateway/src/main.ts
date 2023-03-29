import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware';
import { CacheService } from './cache.service';

interface DecodedToken {
  isIssued: boolean;
  token: null | {
    sub: string;
    iat: number;
    exp: number;
    jti: string;
  };
}

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, {
    bodyParser: false,
  });
  const configService = app.get(ConfigService);
  const blackListCache = app.get(CacheService);

  app.use(
    '/orders',
    createProxyMiddleware({
      target: 'http://orders:3001',
      secure: false,
      changeOrigin: true,
      selfHandleResponse: true,
      onProxyRes: responseInterceptor(async (resBuffer, proxy, req, res) => {
        const response = resBuffer.toString('utf8');

        console.log(req.url);
        console.log(response);
        console.log(req.headers);

        return response;
      }),
    }),
  );

  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://auth:3002',
      secure: false,
      changeOrigin: true,
      selfHandleResponse: true,
      onProxyRes: responseInterceptor(async (resBuffer, proxy, req, res) => {
        if (proxy.headers['content-type'] === 'application/json') {
          const [, bearerToken] = proxy.headers.authorization.split(' ');

          const response = JSON.parse(
            resBuffer.toString('utf8'),
          ) as DecodedToken;

          console.log(response);

          if (response) {
            // isIssued = true, token is issued by the auth service or is valid
            // blacklist token
            if (response.isIssued) {
              const { token } = response;
              blackListCache.set(token.jti, bearerToken, token.exp);

              return JSON.stringify(response);
            } else {
              return JSON.stringify(response);
            }
          }
        }

        return resBuffer;
      }),
    }),
  );

  await app.listen(configService.get('PORT'));
}
bootstrap();
