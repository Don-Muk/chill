import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreatePlaylistDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsInt()
    order?: number; 

    @IsInt()
    userId: number;
}