import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ComplaintMuteService } from './complaint-mute.service';
import { RolesDecorator } from 'src/roles/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { ComplaintMuteDto } from './dto/complaint-mute.dto';
import { AccessLevel } from 'src/roles/common/role.common';

@Controller('complaint-mute')
export class ComplaintMuteController {
    constructor(private complaintMuteService: ComplaintMuteService) { }

    @RolesDecorator(AccessLevel.MODERATOR)
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    mute(@Body() complaintMuteDto: ComplaintMuteDto) {
        return this.complaintMuteService.mute(complaintMuteDto);
    }
}
