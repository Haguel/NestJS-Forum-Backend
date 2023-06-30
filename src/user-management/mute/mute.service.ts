import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/users.model';
import { UsersService } from 'src/users/users.service';
import { MuteDto } from './dto/mute.dto';
import convertStringToDate from 'src/common/convertStringToDate';

@Injectable()
export class MuteService {
    constructor(private usersService: UsersService) { }

    private async muteWithModel(user: User, reason: string, muteExpiredAt?: Date): Promise<void> {
        user.isMuted = true;
        user.muteReason = reason;
        user.muteExpiredAt = muteExpiredAt;

        await user.save();
    }

    async mute(muteDto: MuteDto): Promise<void> {
        const user: User = await this.usersService.getUser(muteDto.userId);
        let muteExpiredAt: Date | null = convertStringToDate(muteDto.muteExpiredAt);

        this.muteWithModel(user, muteDto.muteReason, muteExpiredAt);
    }

    async unmute(id: number): Promise<void> {
        const user: User = await this.usersService.getUser(id);

        user.isMuted = false;
        user.muteReason = null;
        user.muteExpiredAt = null;

        await user.save();
    }
}
