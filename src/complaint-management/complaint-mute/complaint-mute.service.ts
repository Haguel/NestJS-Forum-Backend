import { Injectable, NotFoundException } from '@nestjs/common';
import { ComplaintsService } from 'src/complaints/complaints.service';
import { PostsService } from 'src/posts/posts.service';
import { ComplaintMuteDto } from './dto/complaint-mute.dto';
import { Complaint } from 'src/complaints/models/complaints.model';
import convertStringToDate from 'src/common/convertStringToDate';
import { User } from 'src/users/models/users.model';
import { Post } from 'src/posts/models/posts.model';

@Injectable()
export class ComplaintMuteService {
    constructor(
        private complaintsService: ComplaintsService,
        private postsService: PostsService,
    ) { }

    async mute(complaintMuteDto: ComplaintMuteDto): Promise<void> {
        const complaint: Complaint = await this.complaintsService.getComplaint(complaintMuteDto.complaintId);

        if (!complaint) throw new NotFoundException(`Complaint with id ${complaintMuteDto.complaintId} doesn't exist`);

        const post: Post = await this.postsService.getPost(complaint.postId);
        const muteExpiredAt: Date | null = convertStringToDate(complaintMuteDto.muteExpiredAt);

        await this.muteWithModel(post.user, complaintMuteDto.muteReason, muteExpiredAt);
        await this.complaintsService.removeComplaintWithModel(complaint);
    }

    private async muteWithModel(user: User, reason: string, muteExpiredAt: Date) {
        user.isMuted = true;
        user.muteReason = reason;
        user.muteExpiredAt = muteExpiredAt;

        await user.save();
    }
}
