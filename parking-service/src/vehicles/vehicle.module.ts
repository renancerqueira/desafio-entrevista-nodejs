import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { vehicleProviders } from './vehicle.providers';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...vehicleProviders,
    VehicleService,
  ],
})
export class VehicleModule {}