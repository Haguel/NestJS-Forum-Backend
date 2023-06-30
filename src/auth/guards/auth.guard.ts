import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from 'src/common/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token: string = this.extractTokenFromHeader(request);

        let jwtPayload: JwtPayload;

        try {
            jwtPayload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            })
        } catch (err) {
            throw new ForbiddenException("The jwt token is wrong");
        }

        request.user = jwtPayload;

        return true;
    }

    private extractTokenFromHeader(request): string {
        const [type, token]: [string, string] = request.headers.authorization?.split(' ') ?? [];

        if (type != 'Bearer' || !token) throw new UnauthorizedException('Invalid token provided');

        return token;
    }
}