import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreatePlaylistDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    readonly order?: number;

    @IsNumber()
    @IsNotEmpty()
    readonly userId: number;
}