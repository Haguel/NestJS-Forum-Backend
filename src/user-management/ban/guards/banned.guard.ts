import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        let canActivate: boolean = true;

        if (user.isBanned) {
            if (user.banExpiredAt) {
                const currentDate: Date = new Date();
                const banExpiredAtDate: Date = user.banExpiredAt;

                if (currentDate > banExpiredAtDate) {
                    this.banService.unbanUser(user.id);
                }

                canActivate = false;
            }

            canActivate = false;
        }

        if (!canActivate) {
            throw new HttpException(`User ${user.username} is banned`, HttpStatus.FORBIDDEN);
        }

        return canActivate;
    }
}