import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EstablishmentController } from './establishments/establishment.controller';
import { EstablishmentModule } from './establishments/establishment.module';
import { establishmentProviders } from './establishments/establishment.providers';
import { EstablishmentService } from './establishments/establishment.service';
import { VehicleController } from './vehicles/vehicle.controller';
import { VehicleModule } from './vehicles/vehicle.module';
import { vehicleProviders } from './vehicles/vehicle.providers';
import { VehicleService } from './vehicles/vehicle.service';

@Module({
  imports: [DatabaseModule,EstablishmentModule,VehicleModule],
  controllers: [AppController,EstablishmentController,VehicleController],
  providers: [AppService,...establishmentProviders,EstablishmentService,...vehicleProviders,VehicleService],
})
export class AppModule {}
