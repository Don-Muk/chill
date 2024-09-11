import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enum/roles.enum";
import { User } from "src/user/entities/user.entity";
import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass()
        ])

        if(!requiredRoles){
            return true
        }

        const { user } = context.switchToHttp().getRequest()

        return requiredRoles.some(role => user.role.includes(role))
    }
}


