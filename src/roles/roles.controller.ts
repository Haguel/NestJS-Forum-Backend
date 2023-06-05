import { Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) { }

    @Post()
    setRoles() {
        this.rolesService.setRoles();
    }

    @Get()
    getRoles() {
        this.rolesService.getRoles();
    }
}
