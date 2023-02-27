import { Module } from '@nestjs/common';
import { RmqService } from './rmq.service';

@Module({
  providers: [RmqService],
})
export class RmqModule {}
