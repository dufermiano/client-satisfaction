import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasOne, AllowNull } from 'sequelize-typescript';
import { Survey } from './Survey';
import { Question } from './Question';
import { Target } from './Target';

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

  @ForeignKey(() => Target)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  target_id!: number;

  @BelongsTo(() => Target)
  target!: Target

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  answer_text?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  stars?: number;
}
