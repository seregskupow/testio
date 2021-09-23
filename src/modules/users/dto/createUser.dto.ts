import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: 'Name should be STRING type' })
  @MinLength(3)
  @MaxLength(25)
  readonly name: string;

  @IsNotEmpty()
  @IsString({ message: 'Email should be STRING type' })
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString({ message: 'Password should be STRING type' })
  readonly password: string;

  @IsOptional()
  @IsString({ message: 'Avatar should be STRING type' })
  avatar: string;
}
