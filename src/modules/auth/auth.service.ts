import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { MailService } from 'src/core/mailer/mailer.service';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SessionUserDto } from './dto/user.dto';
import { googlePayload } from './types';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  public async validateUser(userEmail: string, pass: string): Promise<UserDto> {
    const user = await this.userService.findOneByEmail(userEmail);
    if (!user) {
      return null;
    }
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }
    return user;
  }

  public async createUser(user): Promise<UserDto> {
    const pass = await this.hashPassword(user.password);

    const newUser = await this.userService.create({ ...user, password: pass });

    return newUser;
  }

  public async validateUserGoogle(payload: googlePayload): Promise<UserDto> {
    const { email, firstName: name, picture: avatar, googleId } = payload;

    const user = await this.userService.findOneByEmail(email);
    if (user)
      return await this.userService.update({
        id: user.id,
        email,
        name,
        avatar,
      });

    const newUser = await this.userService.create({
      email,
      name,
      password: null,
      avatar,
      googleId,
      activated: true,
    });
    return newUser;
  }

  public async sendEmailConfirmation(email: string) {
    const token = this.jwtService.sign(
      { email },
      {
        expiresIn: '5m',
      },
    );
    await this.mailService.confirmEmail(email, token);
  }
  public async activateUser(token: string): Promise<UserDto> {
    const { email } = await this.decodeToken(token);
    if (!email) {
      throw new BadRequestException('Email not provided');
    }
    return await this.userService.activateUser(email);
  }

  private async decodeToken(token: string): Promise<any> {
    try {
      return await this.jwtService.decode(token);
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
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
