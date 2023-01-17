import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '../database/database.module';
import { Vehicle } from './vehicle.entity';
import { VehicleFactory } from './vehicle.factory';
import { VehicleModule } from './vehicles.module';
import { vehicleProviders } from './vehicles.providers';
import { VehiclesService } from './vehicles.service';
import { VehicleType } from './vehicleType.enum';

describe('VehiclesService', () => {
  let service: VehiclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSource, VehicleModule, ...vehicleProviders, VehiclesService],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  describe('findAll', () => {
    it('should return an array of vehicles', async () => {
      const result = [
        VehicleFactory.get(1, 'Toyota', 'Etios', 'OPD4319', VehicleType.CARRO),
        VehicleFactory.get(2, 'Honda', 'Bis', 'OPD5319', VehicleType.MOTO)
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await service.findAll()).toBe(result);
    })
  });
  
});
