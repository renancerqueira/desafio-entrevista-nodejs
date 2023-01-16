import { Module } from '@nestjs/common';
import { establishmentProviders } from 'src/establishments/establishments.providers';
import { EstablishmentService } from 'src/establishments/establishments.service';
import { vehicleProviders } from 'src/vehicles/vehicles.providers';
import { VehiclesService } from 'src/vehicles/vehicles.service';
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