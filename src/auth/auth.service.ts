import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/users.model';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload, convertUserToJwtPayload } from 'src/common/jwt';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/models/roles.model';
import { UsersService } from 'src/users/users.service';
import { AccessLevel } from 'src/roles/common/role.common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly rolesService: RolesService,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginUserDto: LoginUserDto) {
        try {
            const user: User = await this.usersService.findUserByEmail(loginUserDto.email);

            const isPasswordMatch: boolean = await bcrypt.compare(loginUserDto.password, user.passwordHash);

            if (!isPasswordMatch) {
                throw new HttpException('Wrong email or password', HttpStatus.FORBIDDEN);
            }

            const jwtPayload: JwtPayload = convertUserToJwtPayload(user);
            const token: string = this.jwtService.sign(jwtPayload);

            return token;
        } catch (err) {
            console.log(err);
        }
    }

    async register(registerUserDto: RegisterUserDto) {
        try {
            const role: Role = await this.rolesService.getRole(AccessLevel[1]);

            const createUserDto: CreateUserDto = {
                ...registerUserDto,
                role,
                roleId: role.id
            };

            const user: User = await this.usersService.createUser(createUserDto);

            const jwtPayload: JwtPayload = convertUserToJwtPayload(user);
            const token: string = this.jwtService.sign(jwtPayload);

            return token;
        } catch (err) {
            console.log(err);
        }
    }

    // Use this request when you firstly start the app, it will init the first admin
    // There is no need to use it after
    // OR you can add admin by own in database
    async initAdmin() {
        const role: Role = await this.rolesService.getRole(AccessLevel[3]);

        const createUserDto: CreateUserDto = {
            email: "admin@gmail.com",
            username: "admin",
            password: "admin123!",
            role,
            roleId: role.id
        };

        const user: User = await this.usersService.createUser(createUserDto);

        const jwtPayload: JwtPayload = convertUserToJwtPayload(user);
        const token: string = this.jwtService.sign(jwtPayload);

        return token;
    }

}
