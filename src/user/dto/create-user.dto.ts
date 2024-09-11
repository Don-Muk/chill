import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator";
import { Role } from "src/auth/enum/roles.enum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEnum(Role)
    role?: Role

    @IsString()
    @IsStrongPassword()
    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsStrongPassword()
    @MinLength(8)
    @IsNotEmpty()
    confirmPassword : string;
}
