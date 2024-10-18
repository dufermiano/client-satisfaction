import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Research } from './Research';

@Table({
  timestamps: true,
  tableName: 'target',
})
export class Target extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  genre!: number;

  @HasMany(() => Research)
  researches!: Research[];
}
