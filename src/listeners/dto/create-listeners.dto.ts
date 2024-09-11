import { IsNumber } from 'class-validator';

export class CreateListenersDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    musicId: number;
}