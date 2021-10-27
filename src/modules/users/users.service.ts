import { Injectable, Inject, NotImplementedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: CreateUserDto): Promise<UserDto> {
    return await this.userRepository.create<User>(user).then((user) => {
      return plainToClass(UserDto, user.get({ plain: true }), {
        ignoreDecorators: true,
      });
    });
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    return await this.userRepository
      .findOne<User>({ where: { email }, raw: true })
      .then((user) => {
        return plainToClass(UserDto, user, { ignoreDecorators: true });
      });
  }

  async findOneById(id: number): Promise<UserDto> {
    return await this.userRepository
      .findOne<User>({
        where: { id },
        raw: true,
      })
      .then((user) => {
        return plainToClass(UserDto, user, { ignoreDecorators: true });
      });
  }

  async update({ id, name, email, avatar }: UserDto): Promise<UserDto> {
    return await this.userRepository
      .findOne<User>({
        where: { id },
      })
      .then(async (user) => {
        user.name = name;
        user.avatar = avatar;
        user.email = email;
        await user.save();
        return plainToClass(UserDto, user['dataValues'], {
          ignoreDecorators: true,
        });
      });
  }

  async changePassword({ id, oldPassword, newPassword }): Promise<void> {
    return await this.userRepository
      .findOne<User>({
        where: { id },
      })
      .then(async (user) => {
        const match = await bcrypt.compare(oldPassword, newPassword);
        if (match) {
          const password = await bcrypt.hash(newPassword, 10);
          user.password = password;
          await user.save();
        }
        throw new NotImplementedException('Passwords do not match');
      });
  }

  async allUsers(): Promise<UserDto[]> {
    return await this.userRepository
      .findAll({
        raw: true,
      })
      .then((users) => {
        return users.map((user) =>
          plainToClass(UserDto, user, { ignoreDecorators: true }),
        );
      });
  }

  async activateUser(email: string): Promise<UserDto> {
    return await this.userRepository
      .findOne<User>({
        where: { email },
      })
      .then(async (user) => {
        user.activated = true;
        await user.save();
        return plainToClass(UserDto, user['dataValues'], {
          ignoreDecorators: true,
        });
      });
  }
}
