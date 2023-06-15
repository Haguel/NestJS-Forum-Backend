import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';
import { UserRole } from 'src/roles/models/user-roles.model';
import { Role } from 'src/roles/models/roles.model';
import { Post } from 'src/posts/models/posts.model';
import { Complaint } from 'src/complaints/models/complaints.model';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [
    RolesModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '24h' },
      })
    }),
    SequelizeModule.forFeature([User, UserRole, Role, Post, Complaint]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
