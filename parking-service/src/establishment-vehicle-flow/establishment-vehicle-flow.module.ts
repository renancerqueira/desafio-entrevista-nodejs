import { Module } from '@nestjs/common';
import { establishmentProviders } from '../establishments/establishments.providers';
import { EstablishmentService } from '../establishments/establishments.service';
import { vehicleProviders } from '../vehicles/vehicles.providers';
import { VehiclesService } from '../vehicles/vehicles.service';
import { DatabaseModule } from '../database/database.module';
import { establishmentVehicleFlowProviders } from '../establishment-vehicle-flow/establishment-vehicle-flow.providers';
import { EstablishmentVehicleFlowService } from './establishment-vehicle-flow.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...vehicleProviders,
    VehiclesService,
    ...establishmentProviders,
    EstablishmentService,
    ...establishmentVehicleFlowProviders,
    EstablishmentVehicleFlowService,
  ],
})
export class EstablishmentVehicleFlowModule {}