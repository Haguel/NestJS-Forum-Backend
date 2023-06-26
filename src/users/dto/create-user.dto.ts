import { IsNotEmpty, IsNumber } from "class-validator";
import { RegisterUserDto } from "src/auth/dto/register-user.dto";
import { Role } from "src/roles/models/roles.model";

export class CreateUserDto extends RegisterUserDto {
    @IsNotEmpty()
    role: Role;

    @IsNotEmpty()
    @IsNumber()
    roleId: number;
}