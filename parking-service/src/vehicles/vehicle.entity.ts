import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EstablishmentVehicleFlow } from '../establishment-vehicle-flow/establishment-vehicle-flow.entity';
import { VehicleType } from './vehicleType.enum';
import { stringify } from 'querystring';

@Entity()
@Index(["placa"], { unique: true })
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 20, nullable: false })
  marca: string;

  @ApiProperty()
  @Column({ length: 20, nullable: false })
  modelo: string;

  @ApiProperty()
  @Column({ length: 7, nullable: false })
  placa: string;

  @ApiProperty()
  @Column({
    length: Object.values(VehicleType).reduce((a, b) => a.length > b.length ? a : b).length, //Obtem o tamanho do maior item do enum
    nullable: false
  })
  tipo: VehicleType;

  @OneToMany(() => EstablishmentVehicleFlow, establishmentVehicleFlow => establishmentVehicleFlow.vehicle)
  establishmentVehicleFlow: EstablishmentVehicleFlow[];
}