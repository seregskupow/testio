import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SessionUserDto } from './dto/user.dto';
import { googlePayload } from './types';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async validateUser(userEmail: string, pass: string) {
    // find if user exist with this email
    const user = await this.userService.findOneByEmail(userEmail);
    if (!user) {
      return null;
    }
    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }
    return user;
  }

  async createUser(user): Promise<SessionUserDto> {
    // hash the password
    const pass = await this.hashPassword(user.password);

    // create the user
    const newUser = await this.userService.create({ ...user, password: pass });

    const { id, email, avatar, name } = newUser['dataValues'];
    return new SessionUserDto(id, email, name, avatar);
  }

  async validateUserGoogle(payload: googlePayload): Promise<UserDto> {
    const { email, firstName: name, picture: avatar, googleId } = payload;

    const user = await this.userService.findOneByEmail(email);
    if (user) return user;

    const newUser = await this.userService.create({
      email,
      name,
      password: null,
      avatar,
      googleId,
    });
    return newUser;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
