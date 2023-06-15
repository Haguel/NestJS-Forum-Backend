import { HttpException, HttpStatus } from '@nestjs/common';

const roles: string[] = ["user", "admin", "moderator"];

export type roleType = (typeof roles)[number];

// I highly recommend to use this function everywhere where you must provide roleType value
// in order to catch possible errors
export const convertStringToRole = (value: string): roleType => {
    try {
        if (!isRoleType(value)) {
            throw new HttpException(`Invalid value provided: ${value}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return value as roleType;
    } catch (err) {
        console.log(err);

        throw err;
    }
}

const isRoleType = (value: string): value is roleType => roles.includes(value);