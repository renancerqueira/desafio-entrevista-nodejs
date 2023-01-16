import { GetDataSourceProvideName } from 'src/database/database.providers';
import { DataSource } from 'typeorm';
import { EstablishmentVehicleFlow } from './establishment-vehicle-flow.entity';

export const establishmentVehicleFlowProviders = [
  {
    provide: 'ESTABLISHMENTVEHICLEFLOW_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(EstablishmentVehicleFlow),
    inject: [GetDataSourceProvideName()],
  },
];

export function GetEstablishmentVehicleFlowProvideName() {
  return establishmentVehicleFlowProviders[0].provide;
}