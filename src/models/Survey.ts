import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Question } from './Question';
import { Answer } from './Answer';

@Table({
  timestamps: true,
  tableName: 'surveys',
})
export class Survey extends Model {
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  title!: string;

  @HasMany(() => Question)
  questions!: Question[];

  @HasMany(() => Answer)
  answers!: Answer[];
}
