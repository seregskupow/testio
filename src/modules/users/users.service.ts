import { Injectable, Inject } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<UserDto> {
    return await this.userRepository
      .create<User>(user, { raw: true })
      .then((user) => {
        return plainToClass(UserDto, user, { ignoreDecorators: true });
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
}
