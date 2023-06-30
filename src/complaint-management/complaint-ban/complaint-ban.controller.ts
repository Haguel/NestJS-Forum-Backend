import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { RolesDecorator } from 'src/roles/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { ComplaintBanDto } from './dto/complaint-ban.dto';
import { ComplaintBanService } from './complaint-ban.service';
import { AccessLevel } from 'src/roles/common/role.common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Complaint-management")
@Controller('complaint-ban')
export class ComplaintBanController {
    constructor(private complaintBanService: ComplaintBanService) { }

    @HttpCode(HttpStatus.OK)
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiOkResponse()
    @RolesDecorator(AccessLevel.MODERATOR)
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    async ban(@Body() complaintBanDto: ComplaintBanDto): Promise<void> {
        await this.complaintBanService.ban(complaintBanDto);
    }
}
