import { ApiProperty } from "@nestjs/swagger";

export class VehicleCheckInAndCheckOutVolumeDto {

    @ApiProperty()
    checkInVolume: number;

    @ApiProperty()
    checkOutVolume: number;

    @ApiProperty()
    checkInVolumePerHour: number;

    @ApiProperty()
    checkOutVolumePerHour: number;
}