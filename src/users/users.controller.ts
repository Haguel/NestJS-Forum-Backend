import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { RolesDecorator } from 'src/roles/decorators/roles.decorator';
import { convertStringToRoleTitle } from '../roles/common/roles.common';
import { BanUserDto } from './dto/ban-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUser(id);
    }

    @RolesDecorator(convertStringToRoleTitle('admin'))
    @UseGuards(AuthGuard, RolesGuard)
    @Post('ban/:id')
    banUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() banUserDto: BanUserDto) {
        return this.usersService.banUser(id, banUserDto);
    }

    @RolesDecorator(convertStringToRoleTitle('admin'))
    @UseGuards(AuthGuard, RolesGuard)
    @Post('unban/:id')
    unbanUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.unbanUser(id);
    }
}
