import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { establishmentProviders } from './establishment.providers';
import { EstablishmentService } from './establishment.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...establishmentProviders,
    EstablishmentService,
  ],
})
export class EstablishmentModule {}