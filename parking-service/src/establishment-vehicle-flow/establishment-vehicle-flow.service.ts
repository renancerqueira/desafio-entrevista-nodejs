import { Injectable, Inject, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Establishment } from '../establishments/establishment.entity';
import { EstablishmentService } from '../establishments/establishments.service';
import { VehiclesService } from '../vehicles/vehicles.service';
import { Between, IsNull, Repository } from 'typeorm';
import { VehicleCheckInDto } from './dtos/vehicleCheckIn.dto';
import { VehicleCheckInAndCheckOutVolumeDto } from './dtos/VehicleCheckInAndCheckOutVolume.dto';
import { VehicleCheckInAndCheckOutVolumeFilter } from './dtos/vehicleCheckInAndCheckOutVolumeFilter.dto';
import { VehicleCheckOutDto } from './dtos/vehicleCheckOut.dto';
import { EstablishmentVehicleFlow } from './establishment-vehicle-flow.entity';
import { GetEstablishmentVehicleFlowProvideName } from './establishment-vehicle-flow.providers';

@Injectable()
export class EstablishmentVehicleFlowService {
  constructor(
    @Inject(GetEstablishmentVehicleFlowProvideName())
    private establishmentVehicleFlowRepository: Repository<EstablishmentVehicleFlow>,
    private vehicleService: VehiclesService,
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

  async vehicleCheckInAndCheckOutVolume(filter: VehicleCheckInAndCheckOutVolumeFilter): Promise<VehicleCheckInAndCheckOutVolumeDto> {
    const result = new VehicleCheckInAndCheckOutVolumeDto();

    result.checkInVolume = await this.establishmentVehicleFlowRepository.count({
      where: {
        dataEntrada: Between(filter.dtStart, filter.dtEnd),
        dataSaida: IsNull()
      }
    });

    result.checkOutVolume = await this.establishmentVehicleFlowRepository.count({
      where: {
        dataSaida: Between(filter.dtStart, filter.dtEnd)
      }
    });
    
    var hours = Math.abs(filter.dtEnd.getTime() - filter.dtStart.getTime()) / 36e5;
    
    result.checkInVolumePerHour = parseFloat(Math.abs(result.checkInVolume / hours).toFixed(2));
    result.checkOutVolumePerHour = parseFloat(Math.abs(result.checkOutVolume / hours).toFixed(2));

    return result;
  }
}