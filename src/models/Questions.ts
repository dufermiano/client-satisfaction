import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Research } from './Research';

@Table({
  timestamps: true,
  tableName: 'questions',
})
export class Questions extends Model {
  @ForeignKey(() => Research)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  researchId!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  answer!: string;

  @BelongsTo(() => Research)
  research!: Research;
}
