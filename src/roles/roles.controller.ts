import { Body, Controller, Get, Param, UseGuards, ParseIntPipe, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { convertStringToRoleTitle, roleTitle } from './common/roles.common';
import { GetRoleDto } from './dto/get-role.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { RolesDecorator } from './decorators/roles.decorator';
import { AddRoleToUserDto } from './dto/add-role-to-user.dto';
import { RemoveRoleFromUserDto } from './dto/remove-role.from-user.dto';

// New type of roles can only be added by own in database
// then they must be added to roles.common.ts file in roleTitles array
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) { }

    @Get()
    getRole(@Body() getRoleDto: GetRoleDto) {
        const roleTitle: roleTitle = convertStringToRoleTitle(getRoleDto.roleTitle);

        return this.rolesService.getRole(roleTitle);
    }

    @RolesDecorator(convertStringToRoleTitle('admin'))
    @UseGuards(AuthGuard, RolesGuard)
    @Post('add/:id')
    addRoleToUser(
        @Param('id', ParseIntPipe) userId: number,
        @Body() addRoleToUserDto: AddRoleToUserDto
    ) {
        const roleTitle: roleTitle = convertStringToRoleTitle(addRoleToUserDto.role);
        return this.rolesService.addRoleToUser(userId, roleTitle);
    }

    @RolesDecorator(convertStringToRoleTitle('admin'))
    @UseGuards(AuthGuard, RolesGuard)
    @Post('remove/:id')
    removeRoleFromUser(
        @Param('id', ParseIntPipe) userId: number,
        @Body() removeRoleFromUserDto: RemoveRoleFromUserDto
    ) {
        const roleTitle: roleTitle = convertStringToRoleTitle(removeRoleFromUserDto.role);
        return this.rolesService.removeRoleFromUser(userId, roleTitle);
    }
}
