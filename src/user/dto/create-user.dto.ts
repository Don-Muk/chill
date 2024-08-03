import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

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
