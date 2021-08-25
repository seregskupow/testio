import { IsNotEmpty, IsString, IsEmail, IsInt } from 'class-validator';

export class SessionUserDto {
  @IsNotEmpty()
  @IsInt({ message: 'Email should be Int type' })
  readonly id: number;

  @IsNotEmpty()
  @IsString({ message: 'Email should be STRING type' })
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString({ message: 'Email should be STRING type' })
  readonly name: string;

  @IsNotEmpty()
  @IsString({ message: 'Email should be STRING type' })
  readonly avatar: string;

  constructor(id: number, email: string, name: string, avatar: string) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.avatar = avatar;
  }
}
