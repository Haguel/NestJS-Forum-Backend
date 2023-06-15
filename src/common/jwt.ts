import { User } from "src/users/models/users.model";

export interface JwtPayload {
    userId: number;
    userEmail: string;
    userPasswordHash: string;
}

export const convertUserToJwtPayload = (user: User): JwtPayload => {
    return {
        userId: user.id,
        userEmail: user.email,
        userPasswordHash: user.passwordHash,
    };
}