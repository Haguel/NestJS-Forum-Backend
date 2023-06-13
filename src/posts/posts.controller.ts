import { Delete, Controller, Post, Put, Body, Param, Get, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @UseGuards(AuthGuard)
    @Post()
    createPost(@Req() request, @Body() createPostDto: CreatePostDto) {
        return this.postsService.createPost(request.userId, createPostDto);
    }

    @Get(':id')
    getPost(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.getPost(id);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    editPost(
        @Param('id', ParseIntPipe) postiId: number,
        @Req() request,
        @Body() editPostDto: EditPostDto
    ) {
        return this.postsService.editPost(request.userId, postiId, editPostDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    removePost(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.removePost(id);
    }
}
