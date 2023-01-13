import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { EstablishmentController } from './establishments/establishment.controller';
import { EstablishmentModule } from './establishments/establishment.module';
import { establishmentProviders } from './establishments/establishment.providers';
import { EstablishmentService } from './establishments/establishment.service';
import { EstablishmentVehicleFlowController } from './establishmentVehicleFlow/establishmentVehicleFlow.controller';
import { EstablishmentVehicleFlowModule } from './establishmentVehicleFlow/establishmentVehicleFlow.module';
import { establishmentVehicleFlowProviders } from './establishmentVehicleFlow/establishmentVehicleFlow.providers';
import { EstablishmentVehicleFlowService } from './establishmentVehicleFlow/establishmentVehicleFlow.service';
import { VehicleController } from './vehicles/vehicle.controller';
import { VehicleModule } from './vehicles/vehicle.module';
import { vehicleProviders } from './vehicles/vehicle.providers';
import { VehicleService } from './vehicles/vehicle.service';

@Module({
  imports: [
    DatabaseModule,
    EstablishmentModule,
    VehicleModule,
    EstablishmentVehicleFlowModule],
  controllers: [
    AppController,
    EstablishmentController,
    VehicleController,
    EstablishmentVehicleFlowController],
  providers: [
    ...establishmentProviders,
    EstablishmentService,
    ...vehicleProviders,
    VehicleService,
    ...establishmentVehicleFlowProviders,
    EstablishmentVehicleFlowService],
})
export class AppModule {}
