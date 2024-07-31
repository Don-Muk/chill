import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-authors.dto';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto){}
