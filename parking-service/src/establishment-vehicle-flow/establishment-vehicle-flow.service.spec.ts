import { Test, TestingModule } from '@nestjs/testing';
import { establishmentProviders } from '../establishments/establishments.providers';
import { EstablishmentService } from '../establishments/establishments.service';
import { vehicleProviders } from '../vehicles/vehicles.providers';
import { VehiclesService } from '../vehicles/vehicles.service';
import { GetDataSourceProvideName } from '../database/database.providers';
import { dataSourceMockFactory } from '../database/datasourse.mock';
import { EstablishmentVehicleFlowFactory } from './establishment-vehicle-flow.factory';
import { EstablishmentVehicleFlowModule } from './establishment-vehicle-flow.module';
import { establishmentVehicleFlowProviders } from './establishment-vehicle-flow.providers';
import { EstablishmentVehicleFlowService } from './establishment-vehicle-flow.service';

describe('EstablishmentVehicleFlowService', () => {
  let service: EstablishmentVehicleFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: GetDataSourceProvideName(), useFactory: dataSourceMockFactory }, ...establishmentVehicleFlowProviders, EstablishmentVehicleFlowService, ...establishmentProviders, EstablishmentService, ...vehicleProviders, VehiclesService],
    }).compile();

    service = module.get<EstablishmentVehicleFlowService>(EstablishmentVehicleFlowService);
  });

  describe('getByVehiclePlateWhithoutDepartureDate', () => {
    it('should return object', async () => {
      const result = EstablishmentVehicleFlowFactory.get(1, 1, 1, new Date());

      jest.spyOn(service, 'getByVehiclePlateWhithoutDepartureDate').mockImplementation(async () => result);

      expect(await service.getByVehiclePlateWhithoutDepartureDate('OPD4319')).toBe(result);
    });
  });
});
