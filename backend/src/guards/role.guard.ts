import { JwtDto } from "@dtos/jwt.dto";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { verifyJwt } from "@utils/jwt";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<string[]>('roles', [context.getHandler(), context.getClass()]);

        if (!roles) {
            return false;
        }

        const request = context.switchToHttp().getRequest();

        const jwt = request.headers.authorization?.split("Bearer ")[1].trim();

        if (!jwt) {
            return false;
        }

        const jwtPayload = verifyJwt<JwtDto>(jwt);

        return this.validateRoles(roles, jwtPayload.role);
    }

    validateRoles(roles: string[], role: string) {
        return roles.includes(role)
    }
}