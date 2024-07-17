import { IsNotEmpty, IsString } from "class-validator";

export class UpdateAuthorDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    biography: string;
}
