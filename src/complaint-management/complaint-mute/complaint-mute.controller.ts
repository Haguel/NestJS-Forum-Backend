import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ComplaintMuteService } from './complaint-mute.service';
import { RolesDecorator } from 'src/roles/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { ComplaintMuteDto } from './dto/complaint-mute.dto';
import { AccessLevel } from 'src/roles/common/role.common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Complaint-management")
@Controller('complaint-mute')
export class ComplaintMuteController {
    constructor(private complaintMuteService: ComplaintMuteService) { }

    @HttpCode(HttpStatus.OK)
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiOkResponse()
    @RolesDecorator(AccessLevel.MODERATOR)
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    async mute(@Body() complaintMuteDto: ComplaintMuteDto): Promise<void> {
        await this.complaintMuteService.mute(complaintMuteDto);
    }
}
