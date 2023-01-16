import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 33066,
        username: 'root',
        password: '1234',
        database: 'parking',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
        logging: true,
      });

      return dataSource.initialize();
    },
  },
];

export function GetDataSourceProvideName() {
  return databaseProviders[0].provide;
}