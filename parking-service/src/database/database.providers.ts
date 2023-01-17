import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DBNAME,
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: process.env.DATABASE_DBNAME === 'true',
        logging: process.env.DATABASE_DBNAME === 'true',
      });

      return dataSource.initialize();
    },
  },
];

export function GetDataSourceProvideName() {
  return databaseProviders[0].provide;
}