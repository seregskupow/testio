import { UserDto } from 'src/modules/users/dto/user.dto';
import { SessionUserDto } from '../dto/user.dto';

export type googlePayload = {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
  googleId: string;
};

export type Done = (err: Error, user: SessionUserDto) => void;
