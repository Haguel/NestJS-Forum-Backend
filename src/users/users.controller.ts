import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { RolesDecorator } from 'src/roles/decorators/roles.decorator';
import { convertStringToRole } from '../roles/types/roles.types';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUser(id);
    }

    // Roles test
    @RolesDecorator(convertStringToRole('admin'))
    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    test() {
        return "yes";
    }
}
