import { Module } from '@nestjs/common';
import { ComplaintsController } from './complaints.controller';
import { ComplaintsService } from './complaints.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Complaint } from './models/complaints.model';
import { JwtModule } from '@nestjs/jwt';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JwtModule,
    UsersModule,
    PostsModule,
    SequelizeModule.forFeature([Complaint])
  ],
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
  exports: [ComplaintsService]
})
export class ComplaintsModule { }
