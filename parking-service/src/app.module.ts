import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { EstablishmentsController } from './establishments/establishments.controller';
import { EstablishmentModule } from './establishments/establishments.module';
import { establishmentProviders } from './establishments/establishments.providers';
import { EstablishmentService } from './establishments/establishments.service';
import { EstablishmentVehicleFlowController } from './establishment-vehicle-flow/establishment-vehicle-flow.controller';
import { EstablishmentVehicleFlowModule } from './establishment-vehicle-flow/establishment-vehicle-flow.module';
import { establishmentVehicleFlowProviders } from './establishment-vehicle-flow/establishment-vehicle-flow.providers';
import { EstablishmentVehicleFlowService } from './establishment-vehicle-flow/establishment-vehicle-flow.service';
import { VehiclesController } from './vehicles/vehicles.controller';
import { VehicleModule } from './vehicles/vehicles.module';
import { vehicleProviders } from './vehicles/vehicles.providers';
import { VehiclesService } from './vehicles/vehicles.service';
import { UsersModule } from './users/users.module';
import { ReportsController } from './reports/reports.controller';
import { EstablishmentVehicleFlow } from './establishment-vehicle-flow/establishment-vehicle-flow';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    EstablishmentModule,
    VehicleModule,
    EstablishmentVehicleFlowModule,
    ],
  controllers: [
    AppController,
    EstablishmentsController,
    VehiclesController,
    EstablishmentVehicleFlowController,
    ReportsController],
  providers: [
    ...establishmentProviders,
    EstablishmentService,
    ...vehicleProviders,
    VehiclesService,
    ...establishmentVehicleFlowProviders,
    EstablishmentVehicleFlowService,
    EstablishmentVehicleFlow],
})
export class AppModule {}
