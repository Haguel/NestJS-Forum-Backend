import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesDecorator } from 'src/roles/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { BanDto } from './dto/ban.dto';
import { BanService } from './ban.service';
import { AccessLevel } from 'src/roles/common/role.common';

@Controller()
export class BanController {
    constructor(private banService: BanService) { }

    @RolesDecorator(AccessLevel.MODERATOR)
    @UseGuards(AuthGuard, RolesGuard)
    @Post('ban')
    ban(@Body() banDto: BanDto) {
        return this.banService.ban(banDto);
    }

    @RolesDecorator(AccessLevel.MODERATOR)
    @UseGuards(AuthGuard, RolesGuard)
    @Post('unban/:id')
    unbanUser(@Param('id', ParseIntPipe) id: number) {
        return this.banService.unbanUser(id);
    }
}
