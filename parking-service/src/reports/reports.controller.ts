import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EstablishmentVehicleFlowService } from '../establishment-vehicle-flow/establishment-vehicle-flow.service';
import { VehicleCheckInAndCheckOutVolumeFilter } from '../establishment-vehicle-flow/dtos/vehicleCheckInAndCheckOutVolumeFilter.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Relatórios')
@Controller('reports')
export class ReportsController {
    constructor(
        private readonly establishmentVehicleFlowService: EstablishmentVehicleFlowService
    ) {}

    @Get(":dtStart/:dtEnd")
    getVehicleCheckInAndCheckOutVolume(@Param('dtStart') dtStart: Date, @Param('dtEnd') dtEnd: Date) {
        const filter = new VehicleCheckInAndCheckOutVolumeFilter();
        filter.setDateStart(dtStart);
        filter.setDateEnd(dtEnd);
        return this.establishmentVehicleFlowService.vehicleCheckInAndCheckOutVolume(filter);
    }
}