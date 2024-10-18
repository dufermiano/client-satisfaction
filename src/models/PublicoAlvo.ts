import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Pesquisa } from './Pesquisa';

@Table({
  timestamps: true,
  tableName: 'publico_alvo',
})
export class PublicoAlvo extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  genero!: number;

  @HasMany(() => Pesquisa)
  pesquisas!: Pesquisa[];
}
