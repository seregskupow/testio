import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
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
  readonly avatar: string;

  @IsOptional()
  @IsString({ message: 'GoogleId should be STRING type' })
  readonly googleId?: string;

  @IsOptional()
  @IsString({ message: 'GithubId should be STRING type' })
  readonly githubId?: string;
}
