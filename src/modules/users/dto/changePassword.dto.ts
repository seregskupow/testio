import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class ChangePasswordDTO {
  @IsNotEmpty()
  @IsNumberString()
  readonly id: number;

  @IsString({ message: 'Password should be STRING type' })
  readonly oldPassword: string;

  @IsString({ message: 'Password should be STRING type' })
  readonly newPassword: string;
}
