import { ApiProperty } from '@nestjs/swagger';

export class VehicleCheckInDto {
    @ApiProperty()
    idEstablishment: number;

    @ApiProperty()
    vehiclePlate: string;
}