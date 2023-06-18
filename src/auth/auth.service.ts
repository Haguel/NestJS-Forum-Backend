import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload, convertUserToJwtPayload } from 'src/common/jwt';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/models/roles.model';
import { convertStringToRoleTitle } from 'src/roles/common/roles.common';
import { UsersService } from 'src/users/users.service';

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
            const user: User = await this.usersService.createUser(registerUserDto);
            const role: Role = await this.rolesService.getRole(convertStringToRoleTitle('user'));
            user.$add('role', role);

            const jwtPayload: JwtPayload = convertUserToJwtPayload(user);
            const token: string = this.jwtService.sign(jwtPayload);

            return token;
        } catch (err) {
            console.log(err);
        }
    }
}
