import { Delete, Controller, Post, Put, Body, Param, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @Post()
    createPost() {
        this.postsService.createPost();
    }

    @Get(':id')
    getPost(@Param('id') id: number) {
        this.postsService.getPost();
    }

    @Put(':id')
    editPost(@Param('id') id: number) {
        this.postsService.editPost();
    }

    @Delete(':id')
    removePost(@Param('id') id: number) {
        this.postsService.removePost();
    }
}
