import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/users.model';

@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @HttpCode(HttpStatus.OK)
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiOkResponse({ type: User })
    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return await this.usersService.getUser(id);
    }

    @HttpCode(HttpStatus.OK)
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiOkResponse({ type: User, isArray: true })
    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.usersService.getAllUsers();
    }
}
