import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MuteController } from './mute/mute.controller';
import { BanController } from './ban/ban.controller';
import { BanService } from './ban/ban.service';
import { MuteService } from './mute/mute.service';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [MuteController, BanController],
  providers: [BanService, MuteService],
  exports: [BanService, MuteService]
})
export class UserManagementModule { }
