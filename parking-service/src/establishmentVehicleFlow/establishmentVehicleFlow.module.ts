import { Module } from '@nestjs/common';
import { establishmentProviders } from 'src/establishments/establishment.providers';
import { EstablishmentService } from 'src/establishments/establishment.service';
import { vehicleProviders } from 'src/vehicles/vehicle.providers';
import { VehicleService } from 'src/vehicles/vehicle.service';
import { DatabaseModule } from '../database/database.module';
import { establishmentVehicleFlowProviders } from './establishmentVehicleFlow.providers';
import { EstablishmentVehicleFlowService } from './establishmentVehicleFlow.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...vehicleProviders,
    VehicleService,
    ...establishmentProviders,
    EstablishmentService,
    ...establishmentVehicleFlowProviders,
    EstablishmentVehicleFlowService,
  ],
})
export class EstablishmentVehicleFlowModule {}