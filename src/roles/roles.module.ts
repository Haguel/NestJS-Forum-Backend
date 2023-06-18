import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/roles.model';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule,
    SequelizeModule.forFeature([Role]),
  ],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService]
})
export class RolesModule { }
