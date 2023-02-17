import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }

  @Post()
  creatOrder(@Body() orderDto: CreateOrderDto) {
    return this.ordersService.createOrder(orderDto);
  }

  @Get('/billings')
  getBillings() {
    return this.ordersService.getBillings();
  }
}
