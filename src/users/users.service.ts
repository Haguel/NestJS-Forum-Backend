import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { Post } from 'src/posts/models/posts.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) { }

    async getUser(id: number) {
        return await this.userRepository.findOne({
            where: { id },
            include: [Post]
        });
    }
}
