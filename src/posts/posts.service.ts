import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { Post } from './models/posts.model';
import { EditPostDto } from './dto/edit-post.dto';
import { Complaint } from 'src/complaints/models/complaints.model';
import { User } from 'src/users/models/users.model';
import { Like } from './models/likes.model';
import { Sequelize } from 'sequelize';
import { AccessLevel } from 'src/roles/common/role.common';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post) private postsRepository: typeof Post,
        @InjectModel(Like) private likesRepository: typeof Like,
        private usersService: UsersService
    ) { }

    async createPost(userId: number, createPostDto: CreatePostDto) {
        try {
            // userId from the auth guard - there is no need to check it
            const user: User = await this.usersService.getUser(userId);
            const post: Post = await this.postsRepository.create(
                { ...createPostDto, userId },
                { include: [Like] }
            );

            user.posts.push(post);

            return post;
        } catch (err) {
            console.log(err);
        }
    }

    async getPost(id: number) {
        try {
            const post: Post = await this.postsRepository.findOne({
                where: { id },
                include: [Complaint, User, Like],
            });

            if (!post) {
                throw new HttpException(`Post with id ${id} hasn't been found`, HttpStatus.NOT_FOUND);
            }

            return post;
        } catch (err) {
            console.log(err);
        }
    }

    async getAllPosts() {
        try {
            const posts: Post[] = await this.postsRepository.findAll();

            if (!posts.length) {
                throw new HttpException("There are no posts", HttpStatus.NOT_FOUND);
            }

            return posts;
        } catch (err) {
            console.log(err);
        }
    }

    async editPost(userId: number, postId: number, editPostDto: EditPostDto) {
        try {
            await this.getPost(postId);

            const [, [updatedPost]] = await this.postsRepository.update(
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

    async removePost(userId: number, postId: number) {
        try {
            const post: Post = await this.getPost(postId);

            if (post.userId === userId) {
                await post.destroy();
            } else {
                const user: User = await this.usersService.getUser(userId);

                if (user.role.accessLevel >= AccessLevel.ADMIN) {
                    await post.destroy();
                } else {
                    throw new HttpException(`User ${user.username} with id ${userId} can't remove post of other`, HttpStatus.FORBIDDEN);
                }
            }

            return HttpStatus.OK;
        } catch (err) {
            console.log(err);
        }
    }

    async handleLike(postId: number, userId: number) {
        try {
            const user: User = await this.usersService.getUser(userId);
            const post: Post = await this.getPost(postId);

            const usersLike: Like = await this.likesRepository.findOne({
                where: { userId, postId },
            })

            if (usersLike) {
                post.likes = post.likes.filter((like) => like.id !== usersLike.id);
                await post.save();

                await this.usersService.removeLike(user, usersLike.id);

                await usersLike.destroy();
            } else {
                const like: Like = await this.likesRepository.create({ userId, postId }, { include: [Post, User] });
                like.post = post;
                like.user = user;
                await like.save();

                !post.likes ? post.likes = [like] : post.likes.push(like);
                await post.save();

                !user.likes ? user.likes = [like] : user.likes.push(like);
                await user.save();
            }

            return post.likes.length;
        } catch (err) {
            console.log(err);
        }
    }
}
