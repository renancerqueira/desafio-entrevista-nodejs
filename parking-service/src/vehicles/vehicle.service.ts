import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @Inject('VEHICLE_REPOSITORY')
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  async create(entity: Vehicle): Promise<Vehicle> {
    await this.vehicleRepository.insert(entity).then(x => entity.id = x.raw.insertId);
    return entity;
  }

  async update(id: number, entity: Vehicle) {
    return this.vehicleRepository.update(id, entity);
  }

  async delete(id: number) {
    return this.vehicleRepository.delete(id);
  }
}