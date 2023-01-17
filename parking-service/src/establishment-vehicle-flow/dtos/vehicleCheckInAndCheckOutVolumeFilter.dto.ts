import { ApiProperty } from "@nestjs/swagger";

export class VehicleCheckInAndCheckOutVolumeFilter {

    @ApiProperty()
    dtStart: Date;

    @ApiProperty()
    dtEnd: Date;

    setDateStart(date: Date) {
        this.dtStart = new Date(date);
    }
    setDateEnd(date: Date) {
        date = new Date(date);
        date.setDate(date.getDate() + 1);

        this.dtEnd = date;
    }
}