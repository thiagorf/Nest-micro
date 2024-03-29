import { RmqService } from './rmq/rmq.service';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { BillingModule } from './billing.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<MicroserviceOptions>(
    rmqService.getOptions('BILLING'),
  );
  await app.startAllMicroservices();
}
bootstrap();
