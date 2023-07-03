import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/roles.model';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/models/users.model';
import { SetRoleDto } from './dto/set-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role) private rolesRepository: typeof Role,
        private usersService: UsersService
    ) { }

    async getRole(roleTitle: string): Promise<Role> {
        const role: Role = await this.rolesRepository.findOne({
            where: { title: roleTitle }
        })

        if (!role) throw new NotFoundException(`There is no role with title ${roleTitle}`);

        return role;
    }

    async setRole(userId: number, setRoleDto: SetRoleDto): Promise<void> {
        const user: User = await this.usersService.getUser(userId);
        const role: Role = await this.getRole(setRoleDto.roleTitle);

        user.role = role;
        await user.save();
    }
}
