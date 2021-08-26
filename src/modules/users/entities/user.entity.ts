import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Exclude } from 'class-transformer';

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

  @Exclude({ toPlainOnly: true })
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

  @Exclude()
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  googleId: string;

  @Exclude()
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  githubId: string;
}
