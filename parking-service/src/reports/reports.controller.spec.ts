import { Test, TestingModule } from '@nestjs/testing';
import { establishmentVehicleFlowProviders } from '../establishment-vehicle-flow/establishment-vehicle-flow.providers';
import { EstablishmentVehicleFlowService } from '../establishment-vehicle-flow/establishment-vehicle-flow.service';
import { DataSource } from 'typeorm';
import { ReportsController } from './reports.controller';
import { VehicleCheckInAndCheckOutVolumeDto } from '../establishment-vehicle-flow/dtos/VehicleCheckInAndCheckOutVolume.dto';
import { Console } from 'console';

describe('ReportsController', () => {
  let controller: ReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [DataSource, ...establishmentVehicleFlowProviders, EstablishmentVehicleFlowService]
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  describe('getVehicleCheckInAndCheckOutVolume', () => {
    it('should be dtoResult', async () => {
      const dtoResult = new VehicleCheckInAndCheckOutVolumeDto();
      dtoResult.checkInVolume = 5;
      dtoResult.checkInVolumePerHour = 1;
      dtoResult.checkOutVolume = 4;
      dtoResult.checkOutVolumePerHour = 2;

      console.log(controller);
  
      jest.spyOn(controller, 'getVehicleCheckInAndCheckOutVolume').mockImplementation(async () => dtoResult);
  
      expect(await controller.getVehicleCheckInAndCheckOutVolume(new Date(), new Date())).toBe(dtoResult);
    });
  });
});
