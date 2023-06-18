import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class BanDto {
    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsString()
    @Length(10, 200)
    banReason: string;
}