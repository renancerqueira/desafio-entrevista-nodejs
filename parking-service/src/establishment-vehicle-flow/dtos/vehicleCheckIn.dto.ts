import { ApiProperty } from '@nestjs/swagger';

export class VehicleCheckInDto {
    @ApiProperty()
    idEstablishment: number;

    @ApiProperty()
    vehiclePlate: string;

    constructor(idEstablishment: number, vehiclePlate: string){
        this.idEstablishment = idEstablishment;
        this.vehiclePlate = vehiclePlate;
    }
}