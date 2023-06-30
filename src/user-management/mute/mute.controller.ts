import { Body, Controller, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesDecorator } from 'src/roles/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { MuteService } from './mute.service';
import { MuteDto } from './dto/mute.dto';
import { AccessLevel } from 'src/roles/common/role.common';
import { ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("User management")
@Controller()
export class MuteController {
    constructor(private muteService: MuteService) { }

    @HttpCode(HttpStatus.OK)
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiForbiddenResponse()
    @ApiOkResponse()
    @RolesDecorator(AccessLevel.MODERATOR)
    @UseGuards(AuthGuard, RolesGuard)
    @Post('mute')
    async mute(@Body() muteDto: MuteDto): Promise<void> {
        this.muteService.mute(muteDto);
    }

    @HttpCode(HttpStatus.OK)
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiForbiddenResponse()
    @ApiOkResponse()
    @RolesDecorator(AccessLevel.MODERATOR)
    @UseGuards(AuthGuard, RolesGuard)
    @Post('unmute/:id')
    async unmute(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.muteService.unmute(id);
    }
}
