import { IsNotEmpty, IsString, Length } from "class-validator";

export class BanUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(10, 200)
    banReason: string;
}