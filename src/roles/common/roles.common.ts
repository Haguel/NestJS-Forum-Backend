import { HttpException, HttpStatus } from '@nestjs/common';

const roleTitles: string[] = ["user", "admin", "moderator"];

export type roleTitle = (typeof roleTitles)[number];

// I highly recommend to use this function everywhere where you must provide roleType value
// in order to catch possible errors
export const convertStringToRoleTitle = (value: string): roleTitle => {
    try {
        if (!isRoleType(value)) {
            throw new HttpException(`Invalid value provided: ${value}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return value as roleTitle;
    } catch (err) {
        console.log(err);

        throw err;
    }
}

const isRoleType = (value: string): value is roleTitle => roleTitles.includes(value);

// Roles that can't be removed from user
const immortalRoles: roleTitle[] = [
    convertStringToRoleTitle("user")
]

export const canRoleBeRemoved = (role: roleTitle): boolean => !immortalRoles.includes(role); 