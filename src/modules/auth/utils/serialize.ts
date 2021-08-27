import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Done } from '../types';
import { UsersService } from 'src/modules/users/users.service';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { SessionUserDto } from '../dto/user.dto';
import { isError } from 'util';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super();
  }

  serializeUser(user: UserDto, done) {
    done(null, user.id);
  }

  async deserializeUser(userId: string, done) {
    const user = await this.userService.findOneById(Number(userId));
    if (user)
      return done(null, {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });

    return done(null, null);
  }
}
