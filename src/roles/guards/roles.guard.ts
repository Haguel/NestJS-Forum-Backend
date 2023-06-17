import { CanActivate, Injectable, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from 'src/common/jwt';
import { UsersService } from '../../users/users.service';
import { User } from 'src/users/models/users.model';
import { convertStringToRoleTitle, roleTitle } from '../common/roles.common';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private usersService: UsersService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const requiredRoles: roleTitle[] = this.reflector.get<roleTitle[]>('roleTitles', context.getHandler());

            if (!requiredRoles) {
                throw new HttpException('There is no roles provided to the guard', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            const { userId }: { userId: number } = request.user as JwtPayload;
            const user: User = await this.usersService.getUser(userId);

            if (!areAllRolesIncluded(user.roles, requiredRoles)) {
                throw new HttpException("User doesn't have every required role", HttpStatus.FORBIDDEN);
            }

            return true;
        } catch (err) {
            console.log(err);
        }
    }
}

const areAllRolesIncluded = (userRoles: Role[], requiredRoles: roleTitle[]): boolean => {
    const convertedRolesToTitles: roleTitle[] = [];

    userRoles.forEach((role: Role) => {
        const convertedRole: roleTitle = convertStringToRoleTitle(role.title);

        convertedRolesToTitles.push(convertedRole);
    });

    return requiredRoles.every((roleTitle: roleTitle) => convertedRolesToTitles.includes(roleTitle));
}