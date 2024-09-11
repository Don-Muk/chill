import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/roles.enum';

@Injectable()
export class UserGuard implements CanActivate {
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
        if (user.role.includes(Role.USER)) {
            return true;
        }

        throw new ForbiddenException('Access denied. Not an user or admin.');
    }
}