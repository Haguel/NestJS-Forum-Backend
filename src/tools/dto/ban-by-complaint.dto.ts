import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class BanByComplaintDto {
    @IsNotEmpty()
    @IsInt()
    complaintId: number

    @IsNotEmpty()
    @IsString()
    @Length(10, 200)
    banReason: string
}