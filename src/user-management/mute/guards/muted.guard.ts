import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/common/jwt';
import { UsersService } from '../../../users/users.service';
import { User } from '../../../users/models/users.model';
import { MuteService } from '../mute.service';

@Injectable()
export class MutedGuard implements CanActivate {
    constructor(
        private usersService: UsersService,
        private muteService: MuteService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const payload: JwtPayload = request.user;

        const user: User = await this.usersService.getUser(payload.userId);
        const canActivate: boolean = !(await this.isMuted(user));

        if (!canActivate) {
            throw new HttpException(`User ${user.username} is muted`, HttpStatus.FORBIDDEN);
        }

        return canActivate;
    }

    async isMuted(user: User): Promise<boolean> {
        if (user.isMuted) {
            if (user.muteExpiredAt) {
                const currentDate: Date = new Date();
                const muteExpiredAtDate: Date = user.muteExpiredAt;

                if (currentDate > muteExpiredAtDate) {
                    await this.muteService.unmute(user.id);

                    return false;
                }
            }
        } else return false;

        return true;
    }
}