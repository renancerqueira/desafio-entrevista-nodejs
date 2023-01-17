import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '../database/database.module';
import { VehicleFactory } from './vehicle.factory';
import { VehiclesController } from './vehicles.controller';
import { VehicleModule } from './vehicles.module';
import { vehicleProviders } from './vehicles.providers';
import { VehiclesService } from './vehicles.service';
import { VehicleType } from './vehicleType.enum';

describe('VehiclesController', () => {
  let controller: VehiclesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [VehicleModule],
      imports: [DataSource]
    }).compile();

    controller = app.get<VehiclesController>(VehiclesController);
  });

  describe('getAll', () => {
    it('should return array of vehicles', () => {
      const result = [
        VehicleFactory.get(1, 'Toyota', 'Etios', 'OPD4319', VehicleType.CARRO)
      ];

      jest.spyOn(controller, 'getAll').mockImplementation(async () => result);

      expect(controller.getAll()).toBe(result);
    });
  });
});
