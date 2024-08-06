import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistDto } from './create-playlist.dto';
import { IsInt, Min } from 'class-validator';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto){}
