import { ApiProperty } from '@nestjs/swagger';

export class VehicleCheckOutDto {
    @ApiProperty()
    vehiclePlate: string;
}