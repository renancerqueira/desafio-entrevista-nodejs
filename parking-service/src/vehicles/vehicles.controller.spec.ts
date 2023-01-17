import { Test, TestingModule } from '@nestjs/testing';
import { GetDataSourceProvideName } from '../database/database.providers';
import { dataSourceMockFactory } from '../database/datasourse.mock';
import { VehicleFactory } from './vehicle.factory';
import { VehiclesController } from './vehicles.controller';
import { vehicleProviders } from './vehicles.providers';
import { VehiclesService } from './vehicles.service';
import { VehicleType } from './vehicleType.enum';

describe('VehiclesController', () => {
  let controller: VehiclesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [{ provide: GetDataSourceProvideName(), useFactory: dataSourceMockFactory }, ...vehicleProviders, VehiclesService],
    }).compile();

    controller = app.get<VehiclesController>(VehiclesController);
  });

  describe('getAll', () => {
    it('should return array of vehicles', async () => {
      const result = [
        VehicleFactory.get(1, 'Toyota', 'Etios', 'OPD4319', VehicleType.CARRO)
      ];

      jest.spyOn(controller, 'getAll').mockImplementation(async () => result);

      expect(await controller.getAll()).toBe(result);
    });
  });
});
