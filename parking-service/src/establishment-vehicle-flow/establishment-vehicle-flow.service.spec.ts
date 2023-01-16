import { Test, TestingModule } from '@nestjs/testing';
import { EstablishmentVehicleFlowService } from './establishment-vehicle-flow.service';

describe('EstablishmentVehicleFlowService', () => {
  let service: EstablishmentVehicleFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstablishmentVehicleFlowService],
    }).compile();

    service = module.get<EstablishmentVehicleFlowService>(EstablishmentVehicleFlowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
