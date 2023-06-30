import { Injectable, NotFoundException } from '@nestjs/common';
import { ComplaintsService } from 'src/complaints/complaints.service';
import { Complaint } from 'src/complaints/models/complaints.model';
import { PostsService } from 'src/posts/posts.service';
import { ComplaintBanDto } from './dto/complaint-ban.dto';
import { Post } from 'src/posts/models/posts.model';
import convertStringToDate from 'src/common/convertStringToDate';
import { User } from 'src/users/models/users.model';

@Injectable()
export class ComplaintBanService {
    constructor(
        private complaintsService: ComplaintsService,
        private postsService: PostsService,
    ) { }

    async ban(complaintBanDto: ComplaintBanDto): Promise<void> {
        const complaint: Complaint = await this.complaintsService.getComplaint(complaintBanDto.complaintId);

        if (!complaint) throw new NotFoundException(`Complaint with id ${complaintBanDto.complaintId} doesn't exist`);

        const post: Post = await this.postsService.getPost(complaint.postId);
        const banExpiredAt: Date | null = convertStringToDate(complaintBanDto.banExpiredAt);

        await this.banWithModel(post.user, complaintBanDto.banReason, banExpiredAt);
        await this.complaintsService.removeComplaintWithModel(complaint);
    }

    private async banWithModel(user: User, reason: string, banExpiredAt?: Date): Promise<void> {
        user.isBanned = true;
        user.banReason = reason;
        user.banExpiredAt = banExpiredAt;

        await user.save();
    }
}
