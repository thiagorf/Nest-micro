import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }

  @Get(':id')
  getOneOrder(@Param('id') id: string) {
    return this.ordersService.getOneOrder(+id);
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
