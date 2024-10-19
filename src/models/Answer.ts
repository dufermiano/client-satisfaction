import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Survey } from './Survey';
import { Question } from './Question';


@Table({
  timestamps: true,
  tableName: 'answers',
})
export class Answer extends Model {
  @ForeignKey(() => Survey)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  survey_id!: number;

  @BelongsTo(() => Survey)
  survey!: Survey;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  question_id!: number;

  @BelongsTo(() => Question)
  question!: Question;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  answer_text!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  respondent_email?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5,
    },
  })
  stars?: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  submitted_at!: Date;
}
