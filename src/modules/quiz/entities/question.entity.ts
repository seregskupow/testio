import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Answer } from './answer.entity';
import { Quiz } from './quiz.entity';

@Table({ tableName: 'question' })
export class Question extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  order: number;

  @Column({
    type: DataType.ENUM,
    values: ['checkbox', 'radiobtn', 'text'],
    allowNull: false,
  })
  type: string;

  @ForeignKey(() => Quiz)
  @Column({ type: DataType.INTEGER, field: 'quiz_id' })
  quizId: number;

  @BelongsTo(() => Quiz)
  quiz: Quiz;

  @HasMany(() => Answer)
  answers: Answer;
}
