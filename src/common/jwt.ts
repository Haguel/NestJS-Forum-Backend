import { User } from "src/users/models/users.model";

export interface JwtPayload {
    userId: number;
}

export const convertUserToJwtPayload = (user: User): JwtPayload => {
    return {
        userId: user.id,
    };
}