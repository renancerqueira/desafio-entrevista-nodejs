import { Test, TestingModule } from '@nestjs/testing';
import { EstablishmentVehicleFlowController } from './establishment-vehicle-flow.controller';

describe('EstablishmentVehicleFlowController', () => {
  let controller: EstablishmentVehicleFlowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstablishmentVehicleFlowController],
    }).compile();

    controller = module.get<EstablishmentVehicleFlowController>(EstablishmentVehicleFlowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
