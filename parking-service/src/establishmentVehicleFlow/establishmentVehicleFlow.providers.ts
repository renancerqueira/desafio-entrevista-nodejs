import { DataSource } from 'typeorm';
import { EstablishmentVehicleFlow } from './establishmentVehicleFlow.entity';

export const establishmentVehicleFlowProviders = [
  {
    provide: 'ESTABLISHMENTVEHICLEFLOW_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(EstablishmentVehicleFlow),
    inject: ['DATA_SOURCE'],
  },
];