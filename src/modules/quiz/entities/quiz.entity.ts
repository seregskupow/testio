import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.entity';
import { CompletedQuiz } from './completedQuiz.entity';
import { Question } from './question.entity';

@Table({ tableName: 'quiz' })
export class Quiz extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;
  //TODO: add category
  // @ForeignKey(() => Category)
  // @Column({ type: DataType.INTEGER })
  // category_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, field: 'author_id' })
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @BelongsToMany(() => User, () => CompletedQuiz)
  users: User[];

  @HasMany(() => Question)
  questions: Question[];
}
