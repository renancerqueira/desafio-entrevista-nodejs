import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Establishment } from './establishment.entity';

@Injectable()
export class EstablishmentService {
  constructor(
    @Inject('ESTABLISHMENT_REPOSITORY')
    private establishmentRepository: Repository<Establishment>,
  ) {}

  async findAll(): Promise<Establishment[]> {
    return this.establishmentRepository.find();
  }

  async create(entity: Establishment): Promise<Establishment> {
    await this.establishmentRepository.insert(entity).then(x => entity.id = x.raw.insertId);
    return entity;
  }

  async update(id: number, entity: Establishment) {
    return this.establishmentRepository.update(id, entity);
  }

  async delete(id: number) {
    return this.establishmentRepository.delete(id);
  }
}