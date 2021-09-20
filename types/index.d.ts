import { SessionUserDto } from 'src/modules/auth/dto/user.dto';

declare namespace Express {
  export interface Request {
    user?: SessionUserDto;
  }
}
