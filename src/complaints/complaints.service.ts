import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Complaint } from './models/complaints.model';
import { PostsService } from '../posts/posts.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';

@Injectable()
export class ComplaintsService {
    constructor(
        @InjectModel(Complaint) private complaintRepository: typeof Complaint,
        private postsService: PostsService
    ) { }

    async createComplaint(createComplaintDto: CreateComplaintDto) {
        try {
            const post = await this.postsService.getPost(createComplaintDto.postId);

            const complaint = await this.complaintRepository.create(createComplaintDto);

            post.complaints.push(complaint);

            return complaint;
        } catch (err) {
            console.log(err);
        }
    }

    async getComplaint(id: number) {
        try {
            const complaint = await this.complaintRepository.findByPk(id);

            if (!complaint) {
                throw new HttpException(`There is no complaint with id ${id}`, HttpStatus.NOT_FOUND);
            }

            return complaint;
        } catch (err) {
            console.log(err);
        }
    }

    async removeComplaint(id: number) {
        try {
            await this.getComplaint(id);

            await this.complaintRepository.destroy({ where: { id } });

            return HttpStatus.OK;
        } catch (err) {
            console.log(err);
        }
    }

}
