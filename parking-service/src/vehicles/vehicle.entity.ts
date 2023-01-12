import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
  @Column({ length: 20, nullable: false })
  tipo: string;
}