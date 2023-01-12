import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Index(["cnpj"], { unique: true })
export class Establishment {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 50, nullable: false })
  nome: string;

  @ApiProperty()
  @Column({ length: 14, nullable: false })
  cnpj: string;

  @ApiProperty()
  @Column({ length: 500, nullable: false })
  endereco: string;

  @ApiProperty()
  @Column({ length: 11, nullable: false })
  telefone: string;

  @ApiProperty()
  @Column('int', { nullable: false })
  quantidadeVagasMotos: number;

  @ApiProperty()
  @Column('int', { nullable: false })
  quantidadeVagasCarros: number;
}