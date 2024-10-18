// src/models/Preenchimento.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Pesquisa } from './Pesquisa';

@Table({
  timestamps: true,
  tableName: 'preenchimentos',
})
export class Preenchimento extends Model {
  @ForeignKey(() => Pesquisa)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pesquisaId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  publicoAlvo!: string;

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

  @Column({
    type: DataType.TEXT,
  })
  resposta!: string;

  @BelongsTo(() => Pesquisa)
  pesquisa!: Pesquisa;
}
