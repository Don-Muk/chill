import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Role } from '../enum/roles.enum';

@Injectable()
export class AuthorGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const { user } = request;

        if (!user) {
            throw new ForbiddenException('Access denied. No user found.');
        }

        // Allow access if user is an admin
        if (user.role.includes(Role.ADMIN)) {
            return true;
        }

        // Allow access if user is an author
        if (user.role.includes(Role.AUTHOR)) {
            return true;
        }

        throw new ForbiddenException('Access denied. Not an author or admin.');
    }
}