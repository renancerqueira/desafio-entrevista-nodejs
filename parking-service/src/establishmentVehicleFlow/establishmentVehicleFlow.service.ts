import { Injectable, Inject, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Establishment } from 'src/establishments/establishment.entity';
import { EstablishmentService } from 'src/establishments/establishment.service';
import { Vehicle } from 'src/vehicles/vehicle.entity';
import { VehicleService } from 'src/vehicles/vehicle.service';
import { Repository } from 'typeorm';
import { VehicleCheckInDto } from './dtos/vehicleCheckIn.dto';
import { VehicleCheckOutDto } from './dtos/vehicleCheckOut.dto';
import { EstablishmentVehicleFlow } from './establishmentVehicleFlow.entity';

@Injectable()
export class EstablishmentVehicleFlowService {
  constructor(
    @Inject('ESTABLISHMENTVEHICLEFLOW_REPOSITORY')
    private establishmentVehicleFlowRepository: Repository<EstablishmentVehicleFlow>,
    private vehicleService: VehicleService,
    private establishmentService: EstablishmentService,
  ) {}

  async getByVehiclePlateWhithoutDepartureDate(vehiclePlate: string): Promise<EstablishmentVehicleFlow> {
    const establishmentVehicleFlow = await this.establishmentVehicleFlowRepository
      .createQueryBuilder("establishmentVehicleFlow")
      .innerJoinAndSelect("vehicle", "v", "v.id = establishmentVehicleFlow.vehicleId")
      .where("establishmentVehicleFlow.dataSaida IS NULL")
      .andWhere("v.placa = :vehiclePlate", { vehiclePlate })
      .getOne();

      console.log(establishmentVehicleFlow);
    
    if (!establishmentVehicleFlow.id)
      throw new NotFoundException("Não foi possível obter nenhum registro correspondente a placa informada.");

    return establishmentVehicleFlow;
  }

  async vehicleCheckIn(vehicleCheckInDto: VehicleCheckInDto): Promise<EstablishmentVehicleFlow> {
    const vehicle = await this.vehicleService.obterSeDisponivelParaEstacionar(vehicleCheckInDto.vehiclePlate);

    if (!await this.establishmentService.possuiVagaDisponivel(vehicleCheckInDto.idEstablishment, vehicle.tipo))
      throw new NotAcceptableException(`Capacidade máxima atingida para ${vehicle.tipo}. Não é possível estacionar este veículo neste estabelecimento.`);

    const establishment = new Establishment();
    establishment.id = vehicleCheckInDto.idEstablishment;

    const establishmentVehicleFlow = this.establishmentVehicleFlowRepository.create();
    establishmentVehicleFlow.dataEntrada = new Date();
    establishmentVehicleFlow.establishment = establishment;
    establishmentVehicleFlow.vehicle = vehicle;

    await this.establishmentVehicleFlowRepository.insert(establishmentVehicleFlow).then(x => establishmentVehicleFlow.id = x.raw.insertId);

    return establishmentVehicleFlow;
  }

  async vehicleCheckOut(vehicleCheckOutDto: VehicleCheckOutDto): Promise<EstablishmentVehicleFlow> {
    const establishmentVehicleFlow = await this.getByVehiclePlateWhithoutDepartureDate(vehicleCheckOutDto.vehiclePlate);

    establishmentVehicleFlow.dataSaida = new Date();

    await this.establishmentVehicleFlowRepository.update(establishmentVehicleFlow.id, establishmentVehicleFlow);

    return establishmentVehicleFlow;
  }
}