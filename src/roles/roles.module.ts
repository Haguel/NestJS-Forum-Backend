import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { UsersModule } from 'src/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/roles.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    UsersModule,
    SequelizeModule.forFeature([Role]),
  ],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService]
})
export class RolesModule { }
