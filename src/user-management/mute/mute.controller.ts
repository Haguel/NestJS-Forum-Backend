import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesDecorator } from 'src/roles/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { MuteService } from './mute.service';
import { MuteDto } from './dto/mute.dto';
import { AccessLevel } from 'src/roles/common/role.common';

@Controller()
export class MuteController {
    constructor(private muteService: MuteService) { }

    @RolesDecorator(AccessLevel.MODERATOR)
    @UseGuards(AuthGuard, RolesGuard)
    @Post('mute')
    mute(@Body() muteDto: MuteDto) {
        return this.muteService.mute(muteDto);
    }

    @RolesDecorator(AccessLevel.MODERATOR)
    @UseGuards(AuthGuard, RolesGuard)
    @Post('unmute/:id')
    unmute(@Param('id', ParseIntPipe) id: number) {
        return this.muteService.unmute(id);
    }
}
