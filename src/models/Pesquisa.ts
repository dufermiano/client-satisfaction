import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Perguntas } from './Perguntas';
import { PublicoAlvo } from './PublicoAlvo';

@Table({
  timestamps: true,
  tableName: 'pesquisas',
})
export class Pesquisa extends Model {
  @ForeignKey(() => PublicoAlvo)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  publicoAlvoId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantidadeEstrelas!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @HasMany(() => Perguntas)
  perguntas!: Perguntas[];

  @BelongsTo(() => PublicoAlvo)
  publicoAlvo!: PublicoAlvo;
}
