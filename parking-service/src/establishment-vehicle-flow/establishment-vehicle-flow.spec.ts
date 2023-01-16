import { Test, TestingModule } from '@nestjs/testing';
import { EstablishmentVehicleFlow } from './establishment-vehicle-flow';

describe('EstablishmentVehicleFlow', () => {
  let provider: EstablishmentVehicleFlow;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstablishmentVehicleFlow],
    }).compile();

    provider = module.get<EstablishmentVehicleFlow>(EstablishmentVehicleFlow);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
