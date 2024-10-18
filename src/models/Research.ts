import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Questions } from './Questions';
import { Target } from './Target';

@Table({
  timestamps: true,
  tableName: 'researches',
})
export class Research extends Model {
  @ForeignKey(() => Target)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  targetId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stars!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @HasMany(() => Questions)
  questions!: Questions[];

  @BelongsTo(() => Target)
  target!: Target;
}
