import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateComplaintDto {
    @IsNotEmpty()
    @IsInt()
    postId: number;

    @IsNotEmpty()
    @IsString()
    @Length(10, 100)
    complaintText: string;
}
