import { Delete, Controller, Post, Put, Body, Param, Get, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @Post()
    createPost(@Body() createPostDto: CreatePostDto) {
        return this.postsService.createPost(createPostDto);
    }

    @Get(':id')
    getPost(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.getPost(id);
    }

    @Put(':id')
    editPost(@Param('id', ParseIntPipe) id: number, @Body() editPostDto: EditPostDto) {
        return this.postsService.editPost(id, editPostDto);
    }

    @Delete(':id')
    removePost(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.removePost(id);
    }
}
