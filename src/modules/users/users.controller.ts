import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/core/guards/authenticated.guard';
import { NotFoundInterceptor } from 'src/core/interceptors/notFound.interceptor';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllUsers() {
    return await this.usersService.allUsers();
  }

  @Get('/me')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  getMe(@Request() req) {
    return req.user;
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
