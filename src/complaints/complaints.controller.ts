import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { ComplaintsService } from './complaints.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { RolesDecorator } from 'src/roles/decorators/roles.decorator';
import { BannedGuard } from 'src/user-management/ban/guards/banned.guard';
import { AccessLevel } from 'src/roles/common/role.common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Complaint } from './models/complaints.model';

@ApiTags("Complaints")
@Controller('complaints')
export class ComplaintsController {
    constructor(private complaintsService: ComplaintsService) { }

    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse({ description: "The error shows if there is no post with id from CreateComplaintDto" })
    @ApiCreatedResponse({ type: Complaint })
    @UseGuards(AuthGuard, BannedGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createComplaint(@Body() createComplaintDto: CreateComplaintDto): Promise<Complaint> {
        return await this.complaintsService.createComplaint(createComplaintDto);
    }

    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiOkResponse({ type: Complaint })
    @RolesDecorator(AccessLevel.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async getComplaint(@Param('id', ParseIntPipe) id: number): Promise<Complaint> {
        return await this.complaintsService.getComplaint(id);
    }

    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiOkResponse({ type: Complaint, isArray: true })
    @RolesDecorator(AccessLevel.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    async getAllComplaints(): Promise<Complaint[]> {
        return await this.complaintsService.getAllComplaints();
    }

    @HttpCode(HttpStatus.OK)
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiOkResponse()
    @RolesDecorator(AccessLevel.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @Delete(':id')
    async removeComplaint(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.complaintsService.removeComplaint(id);
    }
}
