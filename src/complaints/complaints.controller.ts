import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { ComplaintsService } from './complaints.service';

@Controller('complaints')
export class ComplaintsController {
    constructor(private complaintsService: ComplaintsService) { }

    @Post()
    createComplaint(@Body() createComplaintDto: CreateComplaintDto) {
        return this.complaintsService.createComplaint(createComplaintDto);
    }

    @Get(':id')
    getComplaint(@Param('id', ParseIntPipe) id: number) {
        return this.complaintsService.getComplaint(id);
    }

    @Delete(':id')
    removeComplaint(@Param('id', ParseIntPipe) id: number) {
        return this.complaintsService.removeComplaint(id);
    }
}
