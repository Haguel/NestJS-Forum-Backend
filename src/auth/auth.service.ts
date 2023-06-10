import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';
import { LoginUserDto } from './dto/login-user.dto';

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

            const isPasswordMatch: boolean = await bcrypt.compare(loginUserDto.password, user.password);

            if (!isPasswordMatch) {
                throw new HttpException('Wrong email or password', HttpStatus.FORBIDDEN);
            }

            const userLoginData = { ...loginUserDto, email: user.email };

            const token: string = this.jwtService.sign(userLoginData);
            return token;
        } catch (err) {
            console.log(err);
        }
    }

    async register(createUserDto: CreateUserDto) {
        try {
            const saltRounds: number = Number(process.env.SALT_ROUNDS);
            const hash: string = await bcrypt.hash(createUserDto.password, saltRounds);

            const userRegisterData = { ...createUserDto, password: hash }

            await this.userRepository.create(userRegisterData);

            const token: string = this.jwtService.sign(userRegisterData);
            return token;
        } catch (err) {
            console.log(err);
        }
    }
}
