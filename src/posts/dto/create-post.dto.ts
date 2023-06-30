import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePostDto {
    @ApiProperty({
        type: String,
        minimum: 1,
        maximum: 50,
        example: "I like BBQ pizza"
    })
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    title: string;

    @ApiProperty({
        type: String,
        minimum: 1,
        maximum: 300,
        example: "Yo guys, I really like BBQ pizza. it's my favorite pizza!"
    })
    @IsString()
    @IsNotEmpty()
    @Length(1, 300)
    description: string;
}