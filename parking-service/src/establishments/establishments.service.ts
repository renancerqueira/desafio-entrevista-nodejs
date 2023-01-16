import { Injectable, Inject } from '@nestjs/common';
import { VehicleType } from 'src/vehicles/vehicleType.enum';
import { Repository } from 'typeorm';
import { Establishment } from './establishment.entity';
import { GetEstablishmentProvideName } from './establishments.providers';

@Injectable()
export class EstablishmentService {
  constructor(
    @Inject(GetEstablishmentProvideName())
    private establishmentRepository: Repository<Establishment>,
  ) {}

  async findAll(): Promise<Establishment[]> {
    return this.establishmentRepository.find();
  }

  async create(entity: Establishment): Promise<Establishment> {
    await this.establishmentRepository.insert(entity).then(x => entity.id = x.raw.insertId);
    return entity;
  }

  async update(id: number, entity: Establishment) {
    return this.establishmentRepository.update(id, entity);
  }

  async delete(id: number) {
    return this.establishmentRepository.delete(id);
  }

  async obterQuantidadeVeiculosEstacionadosPorTipo(id: number, vehicleType: VehicleType) {
    const establishment = await this.establishmentRepository.find({
        where: { id },
        relations: {
          establishmentVehicleFlow: {
            vehicle: true
          }
        }
      })[0];

    return establishment.establishmentVehicleFlow.filter(x => x.dataSaida == null && x.vehicle.tipo == vehicleType).length;
  }

  async possuiVagaDisponivel(id: number, vehicleType: VehicleType): Promise<boolean> {
    const establishment = await this.establishmentRepository.findOne({ where: { id }, relations: { establishmentVehicleFlow: { vehicle: true }} });

    var capacity = 0;

    switch (vehicleType) {
      case VehicleType.CARRO: capacity = establishment.quantidadeVagasCarros;
        break;
      case VehicleType.MOTO: capacity = establishment.quantidadeVagasMotos;
        break;
    }
    
    return capacity > establishment.establishmentVehicleFlow.filter(x => x.dataSaida == null && x.vehicle.tipo == vehicleType).length;
  }
}