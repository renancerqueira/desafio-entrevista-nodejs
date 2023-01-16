import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from 'src/vehicles/vehicle.entity';
import { Establishment } from 'src/establishments/establishment.entity';

@Entity()
export class EstablishmentVehicleFlow {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => EstablishmentVehicleFlow, establishmentVehicleFlow => establishmentVehicleFlow.vehicle)
  vehicle: Vehicle;

  @ApiProperty()
  @ManyToOne(() => EstablishmentVehicleFlow, establishmentVehicleFlow => establishmentVehicleFlow.establishment)
  establishment: Establishment;

  @ApiProperty()
  @Column({ nullable: false })
  dataEntrada: Date;

  @ApiProperty()
  @Column({ nullable: true })
  dataSaida: Date;
}