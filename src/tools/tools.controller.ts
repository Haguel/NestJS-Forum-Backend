import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { RolesDecorator } from 'src/roles/decorators/roles.decorator';
import { convertStringToRoleTitle } from '../roles/common/roles.common';
import { BanDto } from './dto/ban.dto';
import { BanByComplaintDto } from './dto/ban-by-complaint.dto';

@Controller('tools')
export class ToolsController {
    constructor(private toolsService: ToolsService) { }

    @RolesDecorator(convertStringToRoleTitle('admin'))
    @UseGuards(AuthGuard, RolesGuard)
    @Post('ban-complaint')
    banByComplaint(@Body() banDto: BanByComplaintDto) {
        return this.toolsService.banByComplaint(banDto);
    }

    @RolesDecorator(convertStringToRoleTitle('admin'))
    @UseGuards(AuthGuard, RolesGuard)
    @Post('ban')
    ban(@Body() banDto: BanDto) {
        return this.toolsService.ban(banDto);
    }

    @RolesDecorator(convertStringToRoleTitle('admin'))
    @UseGuards(AuthGuard, RolesGuard)
    @Post('unban/:id')
    unbanUser(@Param('id', ParseIntPipe) id: number) {
        return this.toolsService.unbanUser(id);
    }
}
