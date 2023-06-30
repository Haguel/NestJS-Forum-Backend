import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class LoginUserDto {
    @ApiProperty({
        type: String,
        example: "users.email@gmail.com"
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "User's password. It must match these criteria: Min width: 8; Min count of numbers: 1; Min count of special symbols: 1",
        type: String,
        example: "password123!"
    })
    @IsNotEmpty()
    @Matches(/^(?=.*\d)(?=.*\W).{8,}$/, {
        message: "Password must match these criteria: Min width: 8; Min count of numbers: 1; Min count of special symbols: 1"
    })
    password: string;
}