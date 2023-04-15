import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { verifyJwt } from '@utils/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const jwt = request.headers.authorization?.split("Bearer ")[1].trim();

        if (!jwt) {
            throw new UnauthorizedException();
        }

        const jwtPayload = verifyJwt(jwt);

        if (jwtPayload) {
            return true;
        }

        throw new UnauthorizedException();
    }
}