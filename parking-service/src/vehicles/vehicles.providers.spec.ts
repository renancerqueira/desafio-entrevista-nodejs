import { Test, TestingModule } from '@nestjs/testing';
import { GetVehicleProvideName } from './vehicles.providers';

describe('vehicleProviders', () => {

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
    }).compile();
  });

  it('should be defined', () => {
    expect(GetVehicleProvideName()).toBeDefined();
  });

  it('should be equal', () => {
    expect(GetVehicleProvideName()).toEqual('VEHICLE_REPOSITORY');
  });

});
