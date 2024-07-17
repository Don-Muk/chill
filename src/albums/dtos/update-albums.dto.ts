import { IsNotEmpty, IsString } from "class-validator";

export class UpdateAlbumsDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    releaseDate: string;

    @IsString()
    @IsNotEmpty()
    artistName: string;
}
