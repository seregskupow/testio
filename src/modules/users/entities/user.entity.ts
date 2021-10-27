import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Exclude } from 'class-transformer';
import { Quiz } from 'src/modules/quiz/entities/quiz.entity';
import { CompletedQuiz } from 'src/modules/quiz/entities/completedQuiz.entity';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  activated: boolean;

  @Exclude()
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
    field: 'google_id',
  })
  googleId: string;

  @Exclude()
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
    field: 'github_id',
  })
  githubId: string;

  @HasMany(() => Quiz)
  quizes: Quiz[];

  @BelongsToMany(() => Quiz, () => CompletedQuiz)
  savedQuizes: Quiz[];

  users: User[];
}
