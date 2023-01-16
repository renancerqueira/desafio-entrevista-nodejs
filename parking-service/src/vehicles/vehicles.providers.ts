import { DataSource } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { databaseProviders } from 'src/database/database.providers';

export const vehicleProviders = [
  {
    provide: 'VEHICLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Vehicle),
    inject: [databaseProviders[0].provide],
  },
];

export function GetVehicleProvideName() {
  return vehicleProviders[0].provide;
}