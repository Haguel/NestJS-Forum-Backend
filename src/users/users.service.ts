import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserCreationArggs } from './models/users.model';
import { Post } from 'src/posts/models/posts.model';
import { Role } from 'src/roles/models/roles.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Like } from 'src/posts/models/likes.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) { }

    async getUser(id: number): Promise<User> {
        const user: User = await this.userRepository.findOne({
            where: { id },
            include: [Post, Role, Like]
        });

        if (!user) throw new NotFoundException(`There is no user with id ${id}`);

        return user;
    }

    async getAllUsers(): Promise<User[]> {
        const users: User[] = await this.userRepository.findAll({ include: [Post, Like] });

        if (!users.length) throw new NotFoundException("There are no users");

        return users;
    }

    async findUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } })

        if (!user) throw new NotFoundException('There is no users with such email');

        return user;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const existedUser: User = await this.findUserByEmail(createUserDto.email);

        if (existedUser) throw new ConflictException(`The email ${existedUser.email} has already been registered`)

        const saltRounds: number = Number(process.env.SALT_ROUNDS);
        const hash: string = await bcrypt.hash(createUserDto.password, saltRounds);

        const createUserData: UserCreationArggs = { ...createUserDto, passwordHash: hash }
        const user: User = await this.userRepository.create(createUserData);

        user.likes = [];

        return user;
    }

    async removeLike(user: User, likeId: number): Promise<void> {
        user.likes = user.likes.filter((like) => like.id !== likeId);
        await user.save();
    }

    async addLike(user: User, like: Like): Promise<void> {
        !user.likes ? user.likes = [like] : user.likes.push(like);
        await user.save();
    }
}
