import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    login() {
        console.log('login');
    }

    unlogin() {
        console.log('unlogin')
    }

    register() {
        console.log('register')
    }
}
