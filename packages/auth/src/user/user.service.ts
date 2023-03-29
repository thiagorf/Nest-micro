import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EMAIL_IN_USE, INVALID } from '../constants/exceptions';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  select = {
    id: true,
    name: true,
    email: true,
  };

  async createUser(userDto: CreateUserDto) {
    const emailIsAlreadyInUse = await this.prisma.user.findUnique({
      where: {
        email: userDto.email,
      },
    });

    if (emailIsAlreadyInUse) {
      throw new Error(EMAIL_IN_USE);
    }

    const hashedPassword = await hash(userDto.password, 10);

    //bcrypt
    return await this.prisma.user.create({
      data: { ...userDto, password: hashedPassword },
    });
  }

  async findUserByEmail(email: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userExists) {
      throw new Error(INVALID);
    }

    return userExists;
  }

  async findUserByEmailWithoutPassword(email: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: this.select,
    });

    if (!userExists) {
      throw new Error(INVALID);
    }

    return userExists;
  }
}
