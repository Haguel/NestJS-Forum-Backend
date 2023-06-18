import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { JwtModule } from '@nestjs/jwt';
import { UserRole } from 'src/roles/models/user-roles.model';

@Module({
  imports: [
    JwtModule,
    SequelizeModule.forFeature([User, UserRole])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule { }
