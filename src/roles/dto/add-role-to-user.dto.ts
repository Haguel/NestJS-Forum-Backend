import { IsNotEmpty, IsString } from "class-validator";

export class AddRoleToUserDto {
    @IsNotEmpty()
    @IsString()
    role: string;
}