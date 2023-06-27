import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserCreationArggs } from './models/users.model';
import { Post } from 'src/posts/models/posts.model';
import { Role } from 'src/roles/models/roles.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { Like } from 'src/posts/models/likes.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) { }

    async getUser(id: number) {
        try {
            const user: User = await this.userRepository.findOne({
                where: { id },
                include: [Post, Role, Like]
            });

            if (!user) {
                throw new HttpException(`There is no user with id ${id}`, HttpStatus.NOT_FOUND);
            }

            return user;
        } catch (err) {
            console.log(err);
        }
    }

    async getAllUsers() {
        try {
            const users: User[] = await this.userRepository.findAll({ include: [Post, Like] });

            if (!users.length) {
                throw new HttpException("There are no users", HttpStatus.NOT_FOUND);
            }

            return users;
        } catch (err) {
            console.log(err);
        }
    }

    async findUserByEmail(email: string) {
        try {
            const user = await this.userRepository.findOne({ where: { email } })

            if (!user) {
                throw new HttpException('There is no users with such email', HttpStatus.NOT_FOUND);
            }

            return user;
        } catch (err) {
            console.log(err);
        }
    }

    async createUser(createUserDto: CreateUserDto) {
        const saltRounds: number = Number(process.env.SALT_ROUNDS);
        const hash: string = await bcrypt.hash(createUserDto.password, saltRounds);

        const createUserData: UserCreationArggs = { ...createUserDto, passwordHash: hash }
        const user: User = await this.userRepository.create(createUserData);

        user.likes = [];

        return user;
    }

    async removeLike(user: User, likeId: number) {
        user.likes = user.likes.filter((like) => like.id !== likeId);
        await user.save();
    }
}
