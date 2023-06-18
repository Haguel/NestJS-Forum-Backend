import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { ComplaintsService } from './complaints.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { RolesDecorator } from 'src/roles/decorators/roles.decorator';
import { convertStringToRoleTitle } from 'src/roles/common/roles.common';

@Controller('complaints')
export class ComplaintsController {
    constructor(private complaintsService: ComplaintsService) { }

    @UseGuards(AuthGuard)
    @Post()
    createComplaint(@Body() createComplaintDto: CreateComplaintDto) {
        return this.complaintsService.createComplaint(createComplaintDto);
    }

    @RolesDecorator(convertStringToRoleTitle('admin'))
    @UseGuards(AuthGuard, RolesGuard)
    @Get(':id')
    getComplaint(@Param('id', ParseIntPipe) id: number) {
        return this.complaintsService.getComplaint(id);
    }

    @RolesDecorator(convertStringToRoleTitle('admin'))
    @UseGuards(AuthGuard, RolesGuard)
    @Delete(':id')
    removeComplaint(@Param('id', ParseIntPipe) id: number) {
        return this.complaintsService.removeComplaint(id);
    }
}
