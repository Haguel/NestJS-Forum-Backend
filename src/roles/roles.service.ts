import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { roleType } from './types/roles.types';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private rolesRepository: typeof Role) { }

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
}
