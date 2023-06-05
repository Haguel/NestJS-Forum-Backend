import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesService {
    setRoles() {
        console.log('Set roles');
    }

    getRoles() {
        console.log('Get roles');
    }
}
