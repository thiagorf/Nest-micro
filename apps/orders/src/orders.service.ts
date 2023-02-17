import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BILLING_SERVICE } from './cosntants/services';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from './prisma/prisma.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(BILLING_SERVICE) private billingService: ClientProxy,
  ) {}

  async getOrders() {
    return await this.prismaService.orders.findMany();
  }

  async createOrder(orderDto: CreateOrderDto) {
    const order = await this.prismaService.orders.create({
      data: orderDto,
    });
    this.billingService.emit('order_created', {
      orderDto,
    });

    return order;
  }

  async getBillings() {
    const a = await lastValueFrom(
      this.billingService.emit('order_billing_retrieved', {}),
    );

    return a;
  }
}
