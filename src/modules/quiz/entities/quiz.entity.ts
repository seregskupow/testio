import { Table, Model } from 'sequelize-typescript';

@Table({ tableName: 'quiz' })
export class Quiz extends Model {
  titlr: string;

  category: number;
}
