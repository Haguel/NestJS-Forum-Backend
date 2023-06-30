import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { RegisterUserDto } from "src/auth/dto/register-user.dto";
import { Role } from "src/roles/models/roles.model";

export class CreateUserDto extends RegisterUserDto {
    @ApiProperty({ type: Role, example: "USER" })
    @IsNotEmpty()
    role: Role;

    @ApiProperty({ type: Number, example: 1, })
    @IsNotEmpty()
    @IsNumber()
    roleId: number;
}