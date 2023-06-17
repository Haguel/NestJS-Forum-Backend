import { Body, Controller, Get, Param, UseGuards, ParseIntPipe, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { convertStringToRole, roleType } from './common/roles.common';
import { GetRoleDto } from './dto/get-role.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { RolesDecorator } from './decorators/roles.decorator';
import { AddRoleToUserDto } from './dto/add-role-to-user.dto';
import { RemoveRoleFromUserDto } from './dto/remove-role.from-user.dto';

// New roles can only be added by own in database
// then they must be added to roles.types.ts file
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) { }

    @Get()
    getRole(@Body() getRoleDto: GetRoleDto) {
        const roleTitle: roleType = convertStringToRole(getRoleDto.roleTitle);

        return this.rolesService.getRole(roleTitle);
    }

    @RolesDecorator(convertStringToRole('admin'))
    @UseGuards(AuthGuard, RolesGuard)
    @Post('add/:id')
    addRoleToUser(
        @Param('id', ParseIntPipe) userId: number,
        @Body() addRoleToUserDto: AddRoleToUserDto
    ) {
        const role: roleType = convertStringToRole(addRoleToUserDto.role);
        return this.rolesService.addRoleToUser(userId, role);
    }

    @RolesDecorator(convertStringToRole('admin'))
    @UseGuards(AuthGuard, RolesGuard)
    @Post('remove/:id')
    removeRoleFromUser(
        @Param('id', ParseIntPipe) userId: number,
        @Body() removeRoleFromUserDto: RemoveRoleFromUserDto
    ) {
        const role: roleType = convertStringToRole(removeRoleFromUserDto.role);
        return this.rolesService.removeRoleFromUser(userId, role);
    }
}
