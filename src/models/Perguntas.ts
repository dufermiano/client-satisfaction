import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Pesquisa } from './Pesquisa';

@Table({
  timestamps: true,
  tableName: 'perguntas',
})
export class Perguntas extends Model {
  @ForeignKey(() => Pesquisa)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pesquisaId!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  resposta!: string;

  @BelongsTo(() => Pesquisa)
  pesquisa!: Pesquisa;
}
