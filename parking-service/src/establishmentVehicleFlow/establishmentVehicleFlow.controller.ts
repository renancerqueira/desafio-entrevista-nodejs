import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EstablishmentVehicleFlowService } from './establishmentVehicleFlow.service';
import { EstablishmentVehicleFlow } from './establishmentVehicleFlow.entity';
import { VehicleCheckInDto } from './dtos/vehicleCheckIn.dto';
import { VehicleCheckOutDto } from './dtos/vehicleCheckOut.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Fluxo de Veículos no Estabelecimento')
@Controller('establishmentVehicleFlow')
export class EstablishmentVehicleFlowController {
  constructor(private readonly establishmentVehicleFlowService: EstablishmentVehicleFlowService) {}

  @Post('vehicle-check-in')
  vehicleCheckIn(@Body() vehicleCheckInDto: VehicleCheckInDto): Promise<EstablishmentVehicleFlow> {
    return this.establishmentVehicleFlowService.vehicleCheckIn(vehicleCheckInDto);
  }

  @Post('vehicle-check-out')
  vehicleCheckOut(@Body() vehicleCheckOut: VehicleCheckOutDto): Promise<EstablishmentVehicleFlow> {
    return this.establishmentVehicleFlowService.vehicleCheckOut(vehicleCheckOut);
  }
}
