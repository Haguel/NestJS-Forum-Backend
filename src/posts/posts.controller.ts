import { Delete, Controller, Post, Put, Body, Param, Get, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtPayload } from 'src/common/jwt';
import { BannedGuard } from 'src/user-management/ban/guards/banned.guard';
import { MutedGuard } from 'src/user-management/mute/guards/muted.guard';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @UseGuards(AuthGuard, BannedGuard, MutedGuard)
    @Post()
    createPost(@Req() request, @Body() createPostDto: CreatePostDto) {
        const user: JwtPayload = request.user as JwtPayload;

        return this.postsService.createPost(user.userId, createPostDto);
    }

    @Get(':id')
    getPost(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.getPost(id);
    }

    @Get()
    getAllPosts() {
        return this.postsService.getAllPosts();
    }

    @UseGuards(AuthGuard, BannedGuard)
    @Put(':id')
    editPost(
        @Param('id', ParseIntPipe) postId: number,
        @Req() request,
        @Body() editPostDto: EditPostDto
    ) {
        return this.postsService.editPost(request.userId, postId, editPostDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    removePost(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.removePost(id);
    }

    @UseGuards(AuthGuard)
    @Post("handleLike/:id")
    handleLike(@Req() request, @Param('id', ParseIntPipe) postId: number) {
        const user: JwtPayload = request.user as JwtPayload;

        return this.postsService.handleLike(postId, user.userId);
    }
}
