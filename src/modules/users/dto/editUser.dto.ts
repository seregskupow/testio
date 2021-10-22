import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class EditUserDto {
  @IsNotEmpty()
  @IsNumberString()
  readonly id: number;

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
  @IsString({ message: 'Avatar should be STRING type' })
  avatar: string;
}
