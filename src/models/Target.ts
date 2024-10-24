import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Answer } from './Answer';

@Table({
  timestamps: true,
  tableName: 'targets',
})
export class Target extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  name!: string;

  @HasMany(() => Answer)
  answers!: Answer[]
}
