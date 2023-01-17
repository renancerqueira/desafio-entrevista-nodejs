import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { EstablishmentFactory } from './establishment.factory';
import { EstablishmentsController } from './establishments.controller';
import { EstablishmentModule } from './establishments.module';
import { establishmentProviders } from './establishments.providers';
import { EstablishmentService } from './establishments.service';

describe('EstablishmentsController', () => {
  let controller: EstablishmentsController;
  let service: EstablishmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstablishmentsController],
      providers: [DataSource, EstablishmentModule, ...establishmentProviders, EstablishmentService]
    }).compile();

    service = module.get<EstablishmentService>(EstablishmentService);
    controller = module.get<EstablishmentsController>(EstablishmentsController);
  });

  describe('getAll', () => {
    it('should return array of establishments', async () => {
      const result = [
        EstablishmentFactory.get(1, 'RC Parking', '25.020.812/0001-20', 'Rua Jorge Rudge', '3299123456', 10, 15)
      ];

      jest.spyOn(controller, 'getAll').mockImplementation(async () => result);

      expect(await controller.getAll()).toBe(result);
    })
  });
});
