import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
        try {
            const post: Post = await this.postsService.getPost(createComplaintDto.postId);

            const complaint: Complaint = await this.complaintRepository.create(createComplaintDto);

            post.complaints.push(complaint);

            return complaint;
        } catch (err) {
            console.log(err);
        }
    }

    async getComplaint(id: number) {
        try {
            const complaint: Complaint = await this.complaintRepository.findByPk(id);

            if (!complaint) {
                throw new HttpException(`There is no complaint with id ${id}`, HttpStatus.NOT_FOUND);
            }

            return complaint;
        } catch (err) {
            console.log(err);
        }
    }

    async getAllComplaints() {
        try {
            const complaints: Complaint[] = await this.complaintRepository.findAll();

            if (!complaints.length) {
                throw new HttpException("There are no complaints", HttpStatus.NOT_FOUND);
            }

            return complaints;
        } catch (err) {
            console.log(err);
        }
    }

    async removeComplaint(id: number) {
        try {
            const complaint: Complaint = await this.getComplaint(id);

            await this.removeComplaintWithModel(complaint);
        } catch (err) {
            console.log(err);
        }
    }

    async removeComplaintWithModel(complaint: Complaint) {
        await this.complaintRepository.destroy({ where: { id: complaint.id } });

        return HttpStatus.OK;
    }

}
