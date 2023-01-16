import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { vehicleProviders } from './vehicles.providers';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...vehicleProviders,
    VehiclesService,
  ],
})
export class VehicleModule {}