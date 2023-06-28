import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/users.model';
import { UsersService } from 'src/users/users.service';
import { BanDto } from './dto/ban.dto';
import convertStringToDate from 'src/common/convertStringToDate';


@Injectable()
export class BanService {
    constructor(private usersService: UsersService) { }

    private async banWithModel(user: User, reason: string, banExpiredAt?: Date) {
        user.isBanned = true;
        user.banReason = reason;
        user.banExpiredAt = banExpiredAt;

        await user.save();
    }

    async ban(banDto: BanDto) {
        const user: User = await this.usersService.getUser(banDto.userId);
        const banExpiredAt: Date | null = convertStringToDate(banDto.banExpiredAt);

        this.banWithModel(user, banDto.banReason, banExpiredAt);
    }

    async unbanUser(id: number) {
        const user: User = await this.usersService.getUser(id);

        user.isBanned = false;
        user.banReason = null;
        user.banExpiredAt = null;

        await user.save();
    }
}
