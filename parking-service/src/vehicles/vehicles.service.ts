import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { GetVehicleProvideName } from './vehicles.providers';

@Injectable()
export class VehiclesService {
  constructor(
    @Inject(GetVehicleProvideName())
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

  async obterSeDisponivelParaEstacionar(placa: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({
      relations: { establishmentVehicleFlow: true },
      where: {
        placa: placa
      }});
    
    if (vehicle.establishmentVehicleFlow.some(x => x.dataSaida == null))
      throw new ConflictException("Veículo já estacionado. Não é possível efetuar o check in deste veículo. Faça o check out primeiro.");
    
    return vehicle;
  }
}