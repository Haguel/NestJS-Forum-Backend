import { IsNotEmpty, IsString } from 'class-validator';

export class GetRoleDto {
    @IsNotEmpty()
    @IsString()
    roleTitle: string;
}