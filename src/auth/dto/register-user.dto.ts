import { IsEmail, IsNotEmpty, Length, IsString, Matches } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(4, 30)
    @IsString()
    username: string;

    @IsNotEmpty()
    @Matches(/^(?=.*\d)(?=.*\W).{8,}$/, {
        message: "Password must match these criteria: Min width: 8; Min count of numbers: 1; Min count of special symbols: 1"
    })
    password: string;
}