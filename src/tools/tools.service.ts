import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BanByComplaintDto } from './dto/ban-by-complaint.dto';
import { Complaint } from 'src/complaints/models/complaints.model';
import { ComplaintsService } from 'src/complaints/complaints.service';
import { Post } from 'src/posts/models/posts.model';
import { User } from 'src/users/models/users.model';
import { BanDto } from './dto/ban.dto';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class ToolsService {
    constructor(
        private complaintsService: ComplaintsService,
        private usersService: UsersService,
        private postsService: PostsService,
    ) { }

    async banByComplaint(banByComplaintDto: BanByComplaintDto) {
        try {
            const complaint: Complaint = await this.complaintsService.getComplaint(banByComplaintDto.complaintId);

            if (!complaint) {
                throw new HttpException(`Complaint with id ${banByComplaintDto.complaintId} doesn't exist`, HttpStatus.NOT_FOUND);
            }

            const post: Post = await this.postsService.getPost(complaint.postId);

            await this.banWithModel(post.user, banByComplaintDto.banReason);
            await this.complaintsService.removeComplaintWithModel(complaint);
        } catch (err) {
            console.log(err);
        }
    }

    private async banWithModel(user: User, reason: string) {
        user.isBanned = true;
        user.banReason = reason;

        await user.save();

        return HttpStatus.OK;
    }

    async ban(banDto: BanDto) {
        const user: User = await this.usersService.getUser(banDto.userId);

        this.banWithModel(user, banDto.banReason);
    }

    async unbanUser(id: number) {
        const user: User = await this.usersService.getUser(id);

        user.isBanned = false;
        user.banReason = null;

        await user.save();

        return HttpStatus.OK;
    }
}
