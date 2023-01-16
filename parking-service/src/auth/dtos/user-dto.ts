import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    userId: number

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}