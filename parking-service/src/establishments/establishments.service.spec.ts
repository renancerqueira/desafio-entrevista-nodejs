import { Test, TestingModule } from '@nestjs/testing';
import { dataSourceMockFactory } from '../database/datasourse.mock';
import { EstablishmentFactory } from './establishment.factory';
import { establishmentProviders } from './establishments.providers';
import { EstablishmentService } from './establishments.service';
import { GetDataSourceProvideName } from '../database/database.providers';

describe('EstablishmentsService', () => {
  let service: EstablishmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: GetDataSourceProvideName(), useFactory: dataSourceMockFactory }, ...establishmentProviders, EstablishmentService]
    }).compile();

    service = module.get<EstablishmentService>(EstablishmentService);
  });

  describe('findAll', () => {
    it('should return array of establishments', async () => {
      const result = [
        EstablishmentFactory.get(1, 'RC Parking', '25.020.812/0001-20', 'Rua Jorge Rudge', '3299123456', 10, 15)
      ];

      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await service.findAll()).toBe(result);
    })
  });
});
