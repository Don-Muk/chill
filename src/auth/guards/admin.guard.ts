import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from '../enum/roles.enum';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const { user } = request;

        if (!user || !user.role.includes(Role.ADMIN)) {
            throw new UnauthorizedException('Access denied. Admins only.');
        }

        return true;
    }
}