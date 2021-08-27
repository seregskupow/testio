import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Question } from './question.entity';

@Table({ tableName: 'answer' })
export class Answer extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  value: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  correct: boolean;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    field: 'question_id',
  })
  questionId: number;

  @BelongsTo(() => Question)
  question: Question;
}
