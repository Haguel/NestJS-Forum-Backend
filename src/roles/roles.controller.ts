import { Body, Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { convertStringToRole, roleType } from './types/roles.types';
import { GetRoleDto } from './dto/get-role.dto';

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
}
