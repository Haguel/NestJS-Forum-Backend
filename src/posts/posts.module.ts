import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { Post } from './models/posts.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    UsersModule,
    SequelizeModule.forFeature([Post])
  ],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService]
})
export class PostsModule { }
