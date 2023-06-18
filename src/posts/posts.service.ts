import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { Post } from './models/posts.model';
import { EditPostDto } from './dto/edit-post.dto';
import { Complaint } from 'src/complaints/models/complaints.model';
import { User } from 'src/users/models/users.model';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private usersService: UsersService
    ) { }


    async createPost(userId: number, createPostDto: CreatePostDto) {
        try {
            const user = await this.usersService.getUser(userId); // userId from the auth guard - there is no need to check it
            const post = await this.postRepository.create({ ...createPostDto, userId });

            user.posts.push(post);

            return post;
        } catch (err) {
            console.log(err);
        }
    }

    async getPost(id: number) {
        try {
            const post = await this.postRepository.findOne({
                where: { id },
                include: [Complaint, User],
            });

            if (!post) {
                throw new HttpException(`Post with id ${id} hasn't been found`, HttpStatus.NOT_FOUND);
            }

            return post;
        } catch (err) {
            console.log(err);
        }
    }

    async editPost(userId: number, postId: number, editPostDto: EditPostDto) {
        try {
            await this.getPost(postId);

            const [, [updatedPost]] = await this.postRepository.update(
                {
                    ...editPostDto,
                    userId,
                },
                {
                    where: { id: postId },
                    returning: true,
                },
            )

            return updatedPost;
        } catch (err) {
            console.log(err);
        }
    }

    async removePost(id: number) {
        try {
            await this.getPost(id);

            await this.postRepository.destroy({ where: { id } });

            return HttpStatus.OK;
        } catch (err) {
            console.log(err);
        }
    }
}
