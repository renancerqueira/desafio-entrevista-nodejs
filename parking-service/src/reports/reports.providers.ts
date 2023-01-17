import { GetDataSourceProvideName } from 'src/database/database.providers';
import { Establishment } from 'src/establishments/establishment.entity';
import { DataSource } from 'typeorm';

export const reportProviders = [
  {
    provide: 'REPORTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Establishment),
    inject: [GetDataSourceProvideName()],
  },
];

export function GetEstablishmentProvideName() {
  return reportProviders[0].provide;
}