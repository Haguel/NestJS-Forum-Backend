import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { Post } from 'src/posts/models/posts.model';
import { Role } from 'src/roles/models/roles.model';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) { }

    async getUser(id: number) {
        try {
            const user: User = await this.userRepository.findOne({
                where: { id },
                include: [Post, Role]
            });

            if (!user) {
                throw new HttpException(`There is no user with id ${id}`, HttpStatus.NOT_FOUND);
            }

            return user;
        } catch (err) {
            console.log(err);
        }

    }

    async banUser(id: number, banUserDto: BanUserDto) {
        const user: User = await this.getUser(id);

        user.isBanned = true;
        user.banReason = banUserDto.banReason;

        await user.save();

        return HttpStatus.OK;
    }

    async unbanUser(id: number) {
        const user: User = await this.getUser(id);

        user.isBanned = false;
        user.banReason = null;

        await user.save();

        return HttpStatus.OK;
    }
}
