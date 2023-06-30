import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateComplaintDto {
    @ApiProperty({
        type: Number,
        example: "1"
    })
    @IsNotEmpty()
    @IsInt()
    postId: number;

    @ApiProperty({
        type: String,
        minimum: 10,
        maximum: 100,
        example: "This post violates rule 1.11"
    })
    @IsNotEmpty()
    @IsString()
    @Length(10, 100)
    complaintText: string;
}
