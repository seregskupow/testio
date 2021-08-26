import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { NotFoundInterceptor } from 'src/core/interceptors/notFound.interceptor';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllUsers() {
    return await this.usersService.allUsers();
  }

  @Get(':id')
  @UseInterceptors(
    ClassSerializerInterceptor,
    new NotFoundInterceptor('No user found for given userId'),
  )
  async getOneById(@Param() params) {
    const user: UserDto = await this.usersService.findOneById(
      Number(params.id),
    );
    return user;
  }
}
