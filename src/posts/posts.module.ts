import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/posts.model';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserManagementModule } from 'src/user-management/user-management.module';

@Module({
  imports: [
    UserManagementModule,
    UsersModule,
    AuthModule,
    JwtModule,
    SequelizeModule.forFeature([Post])
  ],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService]
})
export class PostsModule { }
