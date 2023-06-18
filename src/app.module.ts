import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { ToolsModule } from './tools/tools.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [],
      autoLoadModels: true,
    }),
    RolesModule,
    AuthModule,
    UsersModule,
    ComplaintsModule,
    PostsModule,
    ToolsModule,
  ],
})
export class AppModule { }
