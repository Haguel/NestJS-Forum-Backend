import { Body, Controller, Get, Param, UseGuards, ParseIntPipe, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { RolesDecorator } from './decorators/roles.decorator';
import { SetRoleDto } from './dto/set-role.dto';
import { AccessLevel } from './common/role.common';

// New type of roles can only be added by own in database
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) { }

    @RolesDecorator(AccessLevel.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @Get(":title")
    getRoleByValue(@Param("title") roleTitle: string) {
        return this.rolesService.getRole(roleTitle);
    }

    @RolesDecorator(AccessLevel.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @Post('add/:id')
    setRole(
        @Param('id', ParseIntPipe) userId: number,
        @Body() setRoleDto: SetRoleDto
    ) {
        return this.rolesService.setRole(userId, setRoleDto);
    }
}
