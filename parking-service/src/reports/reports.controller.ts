import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReportsService } from './reports.service';
import { EstablishmentVehicleFlowService } from 'src/establishment-vehicle-flow/establishment-vehicle-flow.service';
import { VehicleCheckInAndCheckOutVolumeFilter } from 'src/establishment-vehicle-flow/dtos/vehicleCheckInAndCheckOutVolumeFilter.dto';

@ApiBearerAuth()
//@UseGuards(JwtAuthGuard)
@ApiTags('Relatórios')
@Controller('reports')
export class ReportsController {
    constructor(
        private readonly reportsService: ReportsService,
        private readonly establishmentVehicleFlowService: EstablishmentVehicleFlowService
    ) {}

    @Get(":dtStart/:dtEnd")
    update(@Param('dtStart') dtStart: Date, @Param('dtEnd') dtEnd: Date) {
        const filter = new VehicleCheckInAndCheckOutVolumeFilter();
        filter.setDateStart(dtStart);
        filter.setDateEnd(dtEnd);
        return this.establishmentVehicleFlowService.vehicleCheckInAndCheckOutVolume(filter);
    }
}