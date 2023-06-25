import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { convertStringToRoleTitle } from 'src/roles/common/roles.common';
import { RolesDecorator } from 'src/roles/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { MuteService } from './mute.service';
import { MuteDto } from './dto/mute.dto';

@Controller()
export class MuteController {
    constructor(private muteService: MuteService) { }

    @RolesDecorator(convertStringToRoleTitle('moderator'))
    @UseGuards(AuthGuard, RolesGuard)
    @Post('mute')
    mute(@Body() muteDto: MuteDto) {
        return this.muteService.mute(muteDto);
    }

    @RolesDecorator(convertStringToRoleTitle('moderator'))
    @UseGuards(AuthGuard, RolesGuard)
    @Post('unmute/:id')
    unmute(@Param('id', ParseIntPipe) id: number) {
        return this.muteService.unmute(id);
    }
}
