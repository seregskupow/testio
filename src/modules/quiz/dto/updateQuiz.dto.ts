import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class UpdateQuizDto {
  @IsNotEmpty()
  @IsString({ message: 'title should be STRING type' })
  readonly title: string;

  @IsNotEmpty()
  @IsString({ message: 'description should be STRING type' })
  readonly description: string;

  @IsNotEmpty()
  @IsString({ message: 'image should be STRING type' })
  @IsUrl()
  readonly image: string;

  @IsNotEmpty()
  @IsNumber()
  readonly quizId: number;
}
