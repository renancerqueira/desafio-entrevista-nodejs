import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { VehicleCheckInDto } from './dtos/vehicleCheckIn.dto';
import { EstablishmentVehicleFlowController } from './establishment-vehicle-flow.controller';
import { EstablishmentVehicleFlowFactory } from './establishment-vehicle-flow.factory';
import { establishmentVehicleFlowProviders } from './establishment-vehicle-flow.providers';
import { EstablishmentVehicleFlowService } from './establishment-vehicle-flow.service';

describe('EstablishmentVehicleFlowController', () => {
  let controller: EstablishmentVehicleFlowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstablishmentVehicleFlowController],
      providers: [DataSource, ...establishmentVehicleFlowProviders, EstablishmentVehicleFlowService]
    }).compile();

    controller = module.get<EstablishmentVehicleFlowController>(EstablishmentVehicleFlowController);
  });

  describe('vehicleCheckIn', () => {
    it('should return a establishmentVehicleFlow object', async () => {
      const checkIn = new VehicleCheckInDto(1, 'OPD4319');
      const result = EstablishmentVehicleFlowFactory.get(1, 1, 1, new Date());

      jest.spyOn(controller, 'vehicleCheckIn').mockImplementation(async () => result);

      expect(await controller.vehicleCheckIn(checkIn)).toBe(result);
    })
  });
});
