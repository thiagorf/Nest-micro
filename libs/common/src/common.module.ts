import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { RmqModule } from './rmq/rmq.module';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [RmqModule],
})
export class CommonModule {}
