import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/users.model';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload, convertUserToJwtPayload } from 'src/common/jwt';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/models/roles.model';
import { UsersService } from 'src/users/users.service';
import { AccessLevel } from 'src/roles/common/role.common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly rolesService: RolesService,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginUserDto: LoginUserDto): Promise<string> {

        const user: User = await this.usersService.findUserByEmail(loginUserDto.email);

        if (!user) throw new ForbiddenException("Wrong email or password");

        const isPasswordMatch: boolean = await bcrypt.compare(loginUserDto.password, user.passwordHash);

        if (!isPasswordMatch) throw new ForbiddenException("Wrong email or password");

        const jwtPayload: JwtPayload = convertUserToJwtPayload(user);
        const token: string = this.jwtService.sign(jwtPayload);

        return token;
    }

    async register(registerUserDto: RegisterUserDto): Promise<string> {
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
    }
}
