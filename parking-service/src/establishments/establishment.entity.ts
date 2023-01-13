import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EstablishmentVehicleFlow } from 'src/establishmentVehicleFlow/establishmentVehicleFlow.entity';

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

  @OneToMany(() => EstablishmentVehicleFlow, establishmentVehicleFlow => establishmentVehicleFlow.establishment)
  establishmentVehicleFlow: EstablishmentVehicleFlow[];
}