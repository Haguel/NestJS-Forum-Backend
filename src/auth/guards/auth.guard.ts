import { CanActivate, ExecutionContext, Injectable, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from 'src/common/interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const token: string = this.extractTokenFromHeader(request);

            const jwtPayload: JwtPayload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            })

            request.userId = jwtPayload.userId;

            return true;
        } catch (err) {
            if (err.name === 'JsonWebTokenError' && err.message == 'invalid token') {
                throw new HttpException(`The provided token is wrong`, HttpStatus.FORBIDDEN);
            }

            console.log(err);
        }
    }

    private extractTokenFromHeader(request): string {
        try {
            const [type, token]: [string, string] = request.headers.authorization?.split(' ') ?? [];

            if (type != 'Bearer' || !token) {
                throw new HttpException('Invalid token provided', HttpStatus.UNAUTHORIZED);
            }

            return token;
        } catch (err) {
            console.log(err);
        }
    }
}