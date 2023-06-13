import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserCreationArggs } from 'src/users/models/users.model';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from 'src/common/interfaces';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User) private userRepository: typeof User
    ) { }

    async login(loginUserDto: LoginUserDto) {
        try {
            const user = await this.userRepository.findOne({ where: { email: loginUserDto.email } })

            if (!user) {
                throw new HttpException('There is no users with such email', HttpStatus.NOT_FOUND);
            }

            const isPasswordMatch: boolean = await bcrypt.compare(loginUserDto.password, user.passwordHash);

            if (!isPasswordMatch) {
                throw new HttpException('Wrong email or password', HttpStatus.FORBIDDEN);
            }

            const jwtPayload: JwtPayload = {
                userId: user.id,
                userEmail: user.email,
                userPassword: user.passwordHash,
            };

            const token: string = this.jwtService.sign(jwtPayload);
            return token;
        } catch (err) {
            console.log(err);
        }
    }

    async register(createUserDto: CreateUserDto) {
        try {
            const saltRounds: number = Number(process.env.SALT_ROUNDS);
            const hash: string = await bcrypt.hash(createUserDto.password, saltRounds);

            const createUserData: UserCreationArggs = { ...createUserDto, passwordHash: hash }

            const user = await this.userRepository.create(createUserData);

            const jwtPayload: JwtPayload = {
                userId: user.id,
                userEmail: user.email,
                userPassword: user.passwordHash,
            };

            const token: string = this.jwtService.sign(jwtPayload);
            return token;
        } catch (err) {
            console.log(err);
        }
    }
}
