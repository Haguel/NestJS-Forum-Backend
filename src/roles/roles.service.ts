import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { canRoleBeRemoved, roleType } from './common/roles.common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/roles.model';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/models/users.model';
import { UserRole } from './models/user-roles.model';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role) private rolesRepository: typeof Role,
        private usersService: UsersService
    ) { }

    private
    async getRole(roleTitle: roleType) {
        try {
            const role: Role = await this.rolesRepository.findOne({
                where: { title: roleTitle }
            })

            if (!role) {
                throw new HttpException(`There is no role ${role} in database`, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return role;
        } catch (err) {
            console.log(err);
        }
    }

    async addRoleToUser(userId: number, role: roleType) {
        const user: User = await this.usersService.getUser(userId);
        const userRole: Role = await this.getRole(role);

        await user.$add('role', userRole);
        await user.save();

        return HttpStatus.OK;
    }

    async removeRoleFromUser(userId: number, role: roleType) {
        try {
            if (!canRoleBeRemoved(role)) {
                throw new HttpException(`Role ${role} can't be removed from user`, HttpStatus.BAD_REQUEST);
            }

            const user: User = await this.usersService.getUser(userId);

            let userRoleToRemove: Role;
            user.roles.forEach((userRole: Role) => {
                if (userRole.title === role) userRoleToRemove = userRole;
            })

            if (!userRoleToRemove) {
                throw new HttpException(`Role ${role} hasn't been found in user's roles`, HttpStatus.BAD_REQUEST);
            }

            user.$remove('role', userRoleToRemove);

            return HttpStatus.ACCEPTED;
        } catch (err) {
            console.log(err);
        }
    }
}
