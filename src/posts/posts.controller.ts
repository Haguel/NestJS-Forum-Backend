import { Delete, Controller, Post, Put, Body, Param, Get, ParseIntPipe, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtPayload } from 'src/common/jwt';
import { BannedGuard } from 'src/user-management/ban/guards/banned.guard';
import { MutedGuard } from 'src/user-management/mute/guards/muted.guard';
import { Post as PostModel } from './models/posts.model';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Posts")
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @HttpCode(HttpStatus.CREATED)
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse({ description: "The error shows if there is no post with id from CreateComplaintDto" })
    @ApiCreatedResponse({ type: PostModel })
    @UseGuards(AuthGuard, BannedGuard, MutedGuard)
    @Post()
    async createPost(@Req() request, @Body() createPostDto: CreatePostDto): Promise<PostModel> {
        const user: JwtPayload = request.user as JwtPayload;

        return await this.postsService.createPost(user.userId, createPostDto);
    }

    @HttpCode(HttpStatus.OK)
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiOkResponse({ type: PostModel })
    @Get(':id')
    async getPost(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
        return await this.postsService.getPost(id);
    }

    @HttpCode(HttpStatus.OK)
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiOkResponse()
    @ApiOkResponse({ type: PostModel, isArray: true })
    @Get()
    async getAllPosts() {
        return await this.postsService.getAllPosts();
    }

    @HttpCode(HttpStatus.OK)
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiOkResponse({ type: PostModel, isArray: true, description: "Returns updated model" })
    @UseGuards(AuthGuard, BannedGuard)
    @Put(':id')
    async editPost(
        @Param('id', ParseIntPipe) postId: number,
        @Req() request,
        @Body() editPostDto: EditPostDto
    ): Promise<PostModel> {
        return await this.postsService.editPost(request.userId, postId, editPostDto);
    }

    @HttpCode(HttpStatus.OK)
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiOkResponse()
    @UseGuards(AuthGuard)
    @Delete(':id')
    removePost(@Req() request, @Param('id', ParseIntPipe) postId: number): void {
        const user: JwtPayload = request.user as JwtPayload;

        this.postsService.removePost(user.userId, postId);
    }

    @HttpCode(HttpStatus.OK)
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiOkResponse({ type: Number, description: "Returns updated count of likes" })
    @UseGuards(AuthGuard)
    @Post("handleLike/:id")
    handleLike(@Req() request, @Param('id', ParseIntPipe) postId: number): Promise<number> {
        const user: JwtPayload = request.user as JwtPayload;

        return this.postsService.handleLike(postId, user.userId);
    }
}
