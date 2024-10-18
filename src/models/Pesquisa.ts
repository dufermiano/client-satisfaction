// src/models/Pesquisa.ts
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Preenchimento } from './Preenchimento';

@Table({
  timestamps: true, // Adiciona os campos createdAt e updatedAt
  tableName: 'pesquisas', // Nome da tabela no banco de dados
})
export class Pesquisa extends Model {
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

  @HasMany(() => Preenchimento)
  preenchimentos!: Preenchimento[];
}
