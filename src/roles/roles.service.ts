import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { canRoleBeRemoved, roleTitle } from './common/roles.common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/roles.model';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/models/users.model';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role) private rolesRepository: typeof Role,
        private usersService: UsersService
    ) { }

    private
    async getRole(roleTitle: roleTitle) {
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

    async addRoleToUser(userId: number, roleTitle: roleTitle) {
        const user: User = await this.usersService.getUser(userId);
        const userRole: Role = await this.getRole(roleTitle);

        await user.$add('role', userRole);
        await user.save();

        return HttpStatus.OK;
    }

    async removeRoleFromUser(userId: number, roleTitle: roleTitle) {
        try {
            if (!canRoleBeRemoved(roleTitle)) {
                throw new HttpException(`Role ${roleTitle} can't be removed from user`, HttpStatus.BAD_REQUEST);
            }

            const user: User = await this.usersService.getUser(userId);

            let userRoleToRemove: Role;
            user.roles.forEach((role: Role) => {
                if (role.title === roleTitle) userRoleToRemove = role;
            })

            if (!userRoleToRemove) {
                throw new HttpException(`Role ${roleTitle} hasn't been found in user's roles`, HttpStatus.BAD_REQUEST);
            }

            user.$remove('role', userRoleToRemove);

            return HttpStatus.ACCEPTED;
        } catch (err) {
            console.log(err);
        }
    }
}
