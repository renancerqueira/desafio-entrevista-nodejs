import { GetDataSourceProvideName } from '../database/database.providers';
import { DataSource } from 'typeorm';
import { Establishment } from './establishment.entity';

export const establishmentProviders = [
  {
    provide: 'ESTABLISHMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Establishment),
    inject: [GetDataSourceProvideName()],
  },
];

export function GetEstablishmentProvideName() {
  return establishmentProviders[0].provide;
}