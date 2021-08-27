import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.entity';
import { Answer } from './answer.entity';

@Table({ tableName: 'user_answers' })
export class UserAnswers extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @ForeignKey(() => Answer)
  @Column({
    type: DataType.INTEGER,
    field: 'answer_id',
  })
  answerId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  value: string;
}
