import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Complaint } from './models/complaints.model';
import { PostsService } from '../posts/posts.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { Post } from 'src/posts/models/posts.model';

@Injectable()
export class ComplaintsService {
    constructor(
        @InjectModel(Complaint) private complaintRepository: typeof Complaint,
        private postsService: PostsService
    ) { }

    async createComplaint(createComplaintDto: CreateComplaintDto) {
        const post: Post = await this.postsService.getPost(createComplaintDto.postId);

        const complaint: Complaint = await this.complaintRepository.create(createComplaintDto);

        post.complaints.push(complaint);

        return complaint;
    }

    async getComplaint(id: number) {
        const complaint: Complaint = await this.complaintRepository.findByPk(id);

        if (!complaint) throw new NotFoundException(`There is no complaint with id ${id}`);

        return complaint;
    }

    async getAllComplaints() {
        const complaints: Complaint[] = await this.complaintRepository.findAll();

        if (!complaints.length) throw new NotFoundException("There are no complaints");

        return complaints;
    }

    async removeComplaint(id: number) {
        const complaint: Complaint = await this.getComplaint(id);

        await this.removeComplaintWithModel(complaint);
    }

    async removeComplaintWithModel(complaint: Complaint) {
        await this.complaintRepository.destroy({ where: { id: complaint.id } });
    }
}
