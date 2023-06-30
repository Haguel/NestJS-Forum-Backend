import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";

export class ComplaintBanDto {
    @ApiProperty({ type: Number, example: "1" })
    @IsNotEmpty()
    @IsInt()
    complaintId: number;

    @ApiProperty({ type: String, minimum: 10, maximum: 200, example: "Violation of the rules 3/3" })
    @IsNotEmpty()
    @IsString()
    @Length(10, 200)
    banReason: string;

    @ApiPropertyOptional({
        type: String, example: "2023-06-29T10:27:59.601Z",
        description: "The date when ban is removed. The date must be in ISO 8601 format"
    })
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/) // checks ISO 8601 format
    banExpiredAt: string;
}