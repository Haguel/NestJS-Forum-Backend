import { CanActivate, Injectable, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from 'src/common/jwt';
import { UsersService } from '../../users/users.service';
import { User } from 'src/users/models/users.model';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private usersService: UsersService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const requiredAccessLevel: number = this.reflector.get<number>('accessLevel', context.getHandler());

            if (!requiredAccessLevel) {
                throw new HttpException('There is no access level provided to the guard', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            const { userId }: { userId: number } = request.user as JwtPayload;
            const user: User = await this.usersService.getUser(userId);

            if (user.role.accessLevel < requiredAccessLevel) {
                throw new HttpException("User doesn't have required role", HttpStatus.FORBIDDEN);
            }

            return true;
        } catch (err) {
            console.log(err);
        }
    }
}