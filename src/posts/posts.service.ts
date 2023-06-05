import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
    createPost() {
        console.log('Create post');
    }

    removePost() {
        console.log('Remove post');
    }

    editPost() {
        console.log('Edit post');
    }

    getPost() {
        console.log('Get post');
    }
}
