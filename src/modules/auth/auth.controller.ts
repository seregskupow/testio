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
  UploadedFile,
  Req,
  NotImplementedException,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { databaseConfig } from 'src/core/database/database.config';
import { AuthenticatedGuard } from 'src/core/guards/authenticated.guard';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';
import { GoogleAuthGuard } from 'src/core/guards/googleAuth.guard';
import { LocalAuthGuard } from 'src/core/guards/localAuth.guard';
import { ImgUploadService } from 'src/core/img-upload/img-upload.service';
import { MailService } from 'src/core/mailer/mailer.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { join } from 'path';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly imgUploadService: ImgUploadService,
    private readonly mailService: MailService,
  ) {}

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
  async signUpSeeker(@Body() user: CreateUserDto, @Req() req) {
    if (req.file) {
      try {
        const dataUri =
          'data:image/jpeg;base64,' + req.file?.buffer.toString('base64');
        const avatarURL: any = await this.imgUploadService.uploadAvatar(
          dataUri,
        );
        user.avatar = avatarURL.secure_url;
      } catch (error) {
        throw new NotImplementedException('Error while uploading avatar');
      }
    }
    const newUser = await this.authService.createUser(user);
    req.logIn(newUser, (err) => {
      if (err) {
        throw new InternalServerErrorException('Passport login error occured');
      }
    });
    return req.user;
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
    res.send('<script>window.close()</script>');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  async logout(@Request() req, @Response() res) {
    req.logOut();
    return res.json({ msg: 'logged out' });
  }

  @Get('email/:email')
  async email(@Param('email') email) {
    await this.mailService.confirmEmail(email, Math.random().toString());
    return 'complete';
  }
}
