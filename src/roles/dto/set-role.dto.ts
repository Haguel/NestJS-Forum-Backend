import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SetRoleDto {
    @ApiProperty({
        type: String,
        example: "MODERATOR"
    })
    @IsNotEmpty()
    @IsString()
    roleTitle: string;
}