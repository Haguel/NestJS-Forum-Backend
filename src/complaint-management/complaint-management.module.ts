import { Module } from '@nestjs/common';
import { PostsModule } from 'src/posts/posts.module';
import { ComplaintsModule } from 'src/complaints/complaints.module';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ComplaintMuteService } from './complaint-mute/complaint-mute.service';
import { ComplaintMuteController } from './complaint-mute/complaint-mute.controller';
import { ComplaintBanController } from './complaint-ban/complaint-ban.controller';
import { ComplaintBanService } from './complaint-ban/complaint-ban.service';

@Module({
  imports: [
    PostsModule,
    ComplaintsModule,
    RolesModule,
    UsersModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [ComplaintMuteController, ComplaintBanController],
  providers: [ComplaintMuteService, ComplaintBanService]
})
export class ComplaintManagementModule { }
