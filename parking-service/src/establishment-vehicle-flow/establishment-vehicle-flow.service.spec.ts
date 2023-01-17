import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { EstablishmentVehicleFlowFactory } from './establishment-vehicle-flow.factory';
import { EstablishmentVehicleFlowModule } from './establishment-vehicle-flow.module';
import { establishmentVehicleFlowProviders } from './establishment-vehicle-flow.providers';
import { EstablishmentVehicleFlowService } from './establishment-vehicle-flow.service';

describe('EstablishmentVehicleFlowService', () => {
  let service: EstablishmentVehicleFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSource, EstablishmentVehicleFlowModule, ...establishmentVehicleFlowProviders, EstablishmentVehicleFlowService],
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
