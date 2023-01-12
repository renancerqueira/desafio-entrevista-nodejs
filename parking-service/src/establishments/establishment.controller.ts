import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Establishment } from './establishment.entity';
import { EstablishmentService } from './establishment.service';

@ApiTags('Estabelecimentos')
@Controller('establishments')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Get()
  getAll(): Promise<Establishment[]> {
    return this.establishmentService.findAll();
  }

  @Post()
  create(@Body() entity: Establishment): Promise<Establishment> {
    return this.establishmentService.create(entity);
  }

  @Put(":id")
  update(@Param('id') id: number, @Body() entity: Establishment) {
    return this.establishmentService.update(id, entity);
  }

  @Delete(":id")
  delete(@Param('id') id: number) {
    return this.establishmentService.delete(id);
  }
}
