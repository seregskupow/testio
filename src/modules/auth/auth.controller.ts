import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Response,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/core/guards/authenticated.guard';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';
import { GoogleAuthGuard } from 'src/core/guards/googleAuth.guard';
import { LocalAuthGuard } from 'src/core/guards/localAuth.guard';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() user: LoginDto) {
    return req.user;
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUpSeeker(@Body() user: UserDto, @Request() req) {
    console.log(user);
    const newUser = await this.authService.createUser(user);
    console.log(newUser);
    req.logIn(newUser, (err) => {
      if (err)
        throw new InternalServerErrorException('Passport login error occured');
    });
    console.log(req.user);
    return newUser;
    // console.log({ test: req.isAuthenticated() });
  }
  @Get('all')
  async getall() {
    return await this.usersService.allUsers();
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleLogin(@Request() req) {
    console.log({ req: req.user });
    return req.user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  redirect(@Response() res, @Request() req) {
    console.log({ req: req.user });
    res.redirect('/api/v1/protected');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  async logout(@Request() req, @Response() res) {
    req.logOut();
    return res.json({ msg: 'logged out' });
  }
}
