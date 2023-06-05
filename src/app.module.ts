import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { RolesModule } from './roles/roles.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, PostsModule, RolesModule],
})
export class AppModule { }
