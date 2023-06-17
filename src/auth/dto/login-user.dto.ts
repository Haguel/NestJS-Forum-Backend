import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/^(?=.*\d)(?=.*\W).{8,}$/, {
        message: "Password must match these criteria: Min width: 8; Min count of numbers: 1; Min count of special symbols: 1"
    })
    password: string;
}