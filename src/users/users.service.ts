import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserCreationArggs } from './models/users.model';
import { Post } from 'src/posts/models/posts.model';
import { Role } from 'src/roles/models/roles.model';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import * as bcrypt from 'bcrypt';

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

    async getAllUsers() {
        try {
            const users: User[] = await this.userRepository.findAll();

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

    async createUser(registerUserDto: RegisterUserDto) {
        const saltRounds: number = Number(process.env.SALT_ROUNDS);
        const hash: string = await bcrypt.hash(registerUserDto.password, saltRounds);

        const createUserData: UserCreationArggs = { ...registerUserDto, passwordHash: hash }
        const user: User = await this.userRepository.create(createUserData);

        return user;
    }
}
