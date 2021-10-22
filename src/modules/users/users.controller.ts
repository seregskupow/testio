import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
  Request,
  UseGuards,
  Put,
  UploadedFile,
  Body,
  NotImplementedException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticatedGuard } from 'src/core/guards/authenticated.guard';
import { ImgUploadService } from 'src/core/img-upload/img-upload.service';
import { NotFoundInterceptor } from 'src/core/interceptors/notFound.interceptor';
import { EditUserDto } from './dto/editUser.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly imgUploadService: ImgUploadService,
  ) {}

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

  //@UseGuards(AuthenticatedGuard)
  @Put('/editprofile')
  @UseInterceptors(
    FileInterceptor('avatar'),
    ClassSerializerInterceptor,
    new NotFoundInterceptor('No user found for given userId'),
  )
  async editProfile(
    @Body() editUser: EditUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    console.log({ avatar });
    if (avatar) {
      try {
        const dataUri =
          'data:image/jpeg;base64,' + avatar.buffer.toString('base64');
        const avatarURL: any = await this.imgUploadService.uploadAvatar(
          dataUri,
        );
        editUser.avatar = avatarURL.secure_url;
      } catch (error) {
        throw new NotImplementedException('Error while uploading avatar');
      }
    }
    return await this.usersService.update(editUser);
  }

  @Put('/changepassword')
  @UseGuards(AuthenticatedGuard)
  async changePassword() {}
}
