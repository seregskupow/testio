import { Exclude } from 'class-transformer';

export class QuizDto {
  readonly id: number;

  readonly title: string;

  readonly description: string;

  readonly authorId: number;

  @Exclude({ toPlainOnly: true })
  readonly createdAt?: Date;

  @Exclude({ toPlainOnly: true })
  readonly updatedAt?: Date;
}
