import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";

export class ComplaintMuteDto {
    @IsNotEmpty()
    @IsInt()
    complaintId: number;

    @IsNotEmpty()
    @IsString()
    @Length(10, 200)
    muteReason: string;

    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/) // checks ISO 8601 format
    muteExpiredAt: string;
}