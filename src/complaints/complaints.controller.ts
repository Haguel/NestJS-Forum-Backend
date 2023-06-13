import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { ComplaintsService } from './complaints.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('complaints')
export class ComplaintsController {
    constructor(private complaintsService: ComplaintsService) { }

    @UseGuards(AuthGuard)
    @Post()
    createComplaint(@Body() createComplaintDto: CreateComplaintDto) {
        return this.complaintsService.createComplaint(createComplaintDto);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    getComplaint(@Param('id', ParseIntPipe) id: number) {
        return this.complaintsService.getComplaint(id);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    removeComplaint(@Param('id', ParseIntPipe) id: number) {
        return this.complaintsService.removeComplaint(id);
    }
}
