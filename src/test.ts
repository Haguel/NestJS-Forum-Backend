// import { Injectable, Module, forwardRef } from "@nestjs/common";
// import { Complaint } from "./complaints/models/complaints.model";
// import { InjectModel, SequelizeModule } from "@nestjs/sequelize";
// import { JwtModule } from "@nestjs/jwt";
// import { Post } from "./posts/models/posts.model";
// import { User } from "./users/models/users.model";

// @Injectable()
// export class UsersService {
//     constructor(
//         @InjectModel(User) private userRepository: typeof User,
//         private complaintsService: ComplaintsService,
//     ) { }
// }

// @Injectable()
// export class ComplaintsService {
//     constructor(
//         @InjectModel(Complaint) private complaintRepository: typeof Complaint,
//         private postsService: PostsService
//     ) { }
// }

// @Injectable()
// export class PostsService {
//     constructor(
//         @InjectModel(Post) private postRepository: typeof Post,
//         private usersService: UsersService
//     ) { }
// }


// @Module({
//     imports: [
//         forwardRef(() => ComplaintsModule),
//         JwtModule,
//         SequelizeModule.forFeature([User])
//     ],
//     providers: [UsersService],
//     exports: [UsersService],
// })
// export class UsersModule { }

// @Module({
//     imports: [
//         forwardRef(() => PostsModule),
//         JwtModule,
//         SequelizeModule.forFeature([Complaint])
//     ],
//     providers: [ComplaintsService],
//     exports: [ComplaintsService]
// })
// export class ComplaintsModule { }

// @Module({
//     imports: [
//         forwardRef(() => UsersModule),
//         JwtModule,
//         SequelizeModule.forFeature([Post])
//     ],
//     providers: [PostsService],
//     exports: [PostsService]
// })
// export class PostsModule { }
