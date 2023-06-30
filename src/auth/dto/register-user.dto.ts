import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, IsString, Matches } from 'class-validator';

export class RegisterUserDto {
    @ApiProperty({ type: String, example: "users.email@gmail.com" })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: String, minimum: 4, maximum: 30, example: "TestUsername" })
    @IsNotEmpty()
    @Length(4, 30)
    @IsString()
    username: string;

    @ApiProperty({
        type: String, example: "password123!",
        description: "User's password. It must match these criteria: Min width: 8; Min count of numbers: 1; Min count of special symbols: 1",
    })
    @IsNotEmpty()
    @Matches(/^(?=.*\d)(?=.*\W).{8,}$/, {
        message: "Password must match these criteria: Min width: 8; Min count of numbers: 1; Min count of special symbols: 1"
    })
    password: string;
}