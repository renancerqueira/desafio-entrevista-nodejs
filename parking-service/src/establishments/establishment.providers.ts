import { DataSource } from 'typeorm';
import { Establishment } from './establishment.entity';

export const establishmentProviders = [
  {
    provide: 'ESTABLISHMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Establishment),
    inject: ['DATA_SOURCE'],
  },
];