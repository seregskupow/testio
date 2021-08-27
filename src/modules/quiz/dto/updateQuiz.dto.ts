import { Exclude } from 'class-transformer';

export class UpdateQuizDto {
  readonly title: string;

  readonly description: string;
}
