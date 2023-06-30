import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/common/jwt';
import { UsersService } from '../../../users/users.service';
import { User } from '../../../users/models/users.model';
import { BanService } from '../ban.service';

@Injectable()
export class BannedGuard implements CanActivate {
    constructor(
        private usersService: UsersService,
        private banService: BanService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const payload: JwtPayload = request.user;

        const user: User = await this.usersService.getUser(payload.userId);
        const canActivate: boolean = !(await this.isBanned(user));

        if (!canActivate) throw new ForbiddenException(`User ${user.username} is banned`);

        return canActivate;
    }

    async isBanned(user: User): Promise<boolean> {
        if (user.isBanned) {
            if (user.banExpiredAt) {
                const currentDate: Date = new Date();
                const banExpiredAtDate: Date = user.banExpiredAt;

                if (currentDate > banExpiredAtDate) {
                    await this.banService.unbanUser(user.id);

                    return false;
                }
            }
        } else return false;

        return true;
    }
}
