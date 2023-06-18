import { Module } from '@nestjs/common';
import { ToolsController } from './tools.controller';
import { ToolsService } from './tools.service';
import { UsersModule } from 'src/users/users.module';
import { ComplaintsModule } from 'src/complaints/complaints.module';
import { JwtModule } from '@nestjs/jwt';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    JwtModule,
    PostsModule,
    UsersModule,
    ComplaintsModule,
  ],
  controllers: [ToolsController],
  providers: [ToolsService]
})
export class ToolsModule { }
