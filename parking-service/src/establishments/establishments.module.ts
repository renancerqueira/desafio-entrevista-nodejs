import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { establishmentProviders } from './establishments.providers';
import { EstablishmentService } from './establishments.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...establishmentProviders,
    EstablishmentService,
  ],
})
export class EstablishmentModule {}