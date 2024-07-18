import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAlbumsDto {
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