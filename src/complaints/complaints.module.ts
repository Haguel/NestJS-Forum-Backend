import { Module } from '@nestjs/common';
import { ComplaintsController } from './complaints.controller';
import { ComplaintsService } from './complaints.service';
import { PostsModule } from 'src/posts/posts.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Complaint } from './models/complaints.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    PostsModule,
    SequelizeModule.forFeature([Complaint])
  ],
  controllers: [ComplaintsController],
  providers: [ComplaintsService]
})
export class ComplaintsModule { }
