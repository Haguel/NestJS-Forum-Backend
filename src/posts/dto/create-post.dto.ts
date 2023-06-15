import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    title: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 300)
    description: string;
}