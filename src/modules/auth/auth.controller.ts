import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Response,
  UseGuards,
  InternalServerErrorException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/core/guards/authenticated.guard';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';
import { GoogleAuthGuard } from 'src/core/guards/googleAuth.guard';
import { LocalAuthGuard } from 'src/core/guards/localAuth.guard';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  //remove sensitive fields from UserDto
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(DoesUserExist)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signUpSeeker(@Body() user: UserDto, @Request() req) {
    const newUser = await this.authService.createUser(user);
    req.logIn(newUser, (err) => {
      if (err)
        throw new InternalServerErrorException('Passport login error occured');
    });
    return newUser;
  }

  @UseGuards(GoogleAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('google')
  async googleLogin(@Request() req) {
    return req.user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  redirect(@Response() res, @Request() req) {
    res.redirect('/api/v1/protected');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  async logout(@Request() req, @Response() res) {
    req.logOut();
    return res.json({ msg: 'logged out' });
  }
}
