import { PartialType } from '@nestjs/mapped-types';
import { CreateListenersDto } from './create-listeners.dto';

export class UpdateListenersDto extends PartialType(CreateListenersDto){}
