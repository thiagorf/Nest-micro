import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }
  async bill(data: any) {
    this.logger.log('Billing...', data);
    await this.prisma.billing.create({
      data: {
        description: JSON.stringify(data),
      },
    });
  }

  async getBillings() {
    return this.prisma.billing.findMany();
  }
}
