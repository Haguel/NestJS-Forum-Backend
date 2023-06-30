import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class ComplaintMuteDto {
    @ApiProperty({
        type: Number,
        example: "1"
    })
    @IsNotEmpty()
    @IsInt()
    complaintId: number;

    @ApiProperty({
        type: String,
        minimum: 10,
        maximum: 200,
        example: "Rude behavior"
    })
    @IsNotEmpty()
    @IsString()
    @Length(10, 200)
    muteReason: string;

    @ApiProperty({
        description: "The date when mute is removed. The date must be in ISO 8601 format",
        type: String,
        example: "2023-06-29T10:27:59.601Z"
    })
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/) // checks ISO 8601 format
    muteExpiredAt: string;
}