import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.entity';
import { Quiz } from './quiz.entity';

@Table({ tableName: 'completed_quiz' })
export class CompletedQuiz extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @ForeignKey(() => Quiz)
  @Column({
    type: DataType.INTEGER,
    field: 'quiz_id',
  })
  quizId: number;

  @Column({
    type: DataType.INTEGER,
  })
  right: number;

  @Column({
    type: DataType.INTEGER,
  })
  wrong: number;

  //TODO: implement scoring system
  //totalscore: number;
}
