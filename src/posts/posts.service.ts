import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { Post } from './models/posts.model';
import { EditPostDto } from './dto/edit-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private usersService: UsersService
    ) { }


    async createPost(createPostDto: CreatePostDto) {
        try {
            const user = await this.usersService.getUser(createPostDto.userId);

            if (!user) {
                throw new HttpException(`User with id ${createPostDto.userId} hasn't been found`, HttpStatus.NOT_FOUND);
            }

            const post = await this.postRepository.create(createPostDto);
            user.posts.push(post);

            return post;
        } catch (err) {
            console.log(err);
        }


    }

    async getPost(id: number) {
        try {
            const post = await this.postRepository.findByPk(id);

            if (!post) {
                throw new HttpException(`Post with id ${id} hasn't been found`, HttpStatus.NOT_FOUND);
            }

            return post;
        } catch (err) {
            console.log(err);
        }
    }

    async editPost(id: number, editPostDto: EditPostDto) {
        try {
            await this.getPost(id); // error if no post

            const [, updatedPost] = await this.postRepository.update(
                {
                    ...editPostDto,
                },
                {
                    where: { id },
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
            await this.getPost(id); // error if no post

            await this.postRepository.destroy({ where: { id } });

            return HttpStatus.OK;
        } catch (err) {
            console.log(err);
        }
    }

}
