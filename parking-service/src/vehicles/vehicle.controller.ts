import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { Vehicle } from './vehicle.entity';
import { VehicleService } from './vehicle.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Veículos')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  getAll(): Promise<Vehicle[]> {
    return this.vehicleService.findAll();
  }

  @Post()
  create(@Body() entity: Vehicle): Promise<Vehicle> {
    return this.vehicleService.create(entity);
  }

  @Put(":id")
  update(@Param('id') id: number, @Body() entity: Vehicle) {
    return this.vehicleService.update(id, entity);
  }

  @Delete(":id")
  delete(@Param('id') id: number) {
    return this.vehicleService.delete(id);
  }
}
