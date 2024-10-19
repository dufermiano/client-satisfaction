import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Survey } from './Survey';

@Table({
  timestamps: true,
  tableName: 'questions',
})
export class Question extends Model {
  @ForeignKey(() => Survey)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  survey_id!: number;

  @BelongsTo(() => Survey)
  survey!: Survey;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  question_text!: string;

  @Column({
    type: DataType.ENUM('text', 'email', 'number'),
    allowNull: false,
  })
  response_type!: 'text' | 'email' | 'number';
}
