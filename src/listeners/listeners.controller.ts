import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UpdateListenersDto } from './dto/update-listeners.dto';
import { CreateListenersDto } from './dto/create-listeners.dto';
import { ListenersService } from './listeners.service';

@Controller('listeners')
export class ListenersController {
constructor(private readonly listenersService: ListenersService) {}

  @Post()
  create(@Body() createListenersDto: CreateListenersDto) {
    return this.listenersService.create(createListenersDto);
  }

  @Get()
  findAll() {
    return this.listenersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listenersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListenersDto: UpdateListenersDto) {
    return this.listenersService.update(+id, updateListenersDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listenersService.remove(+id);
  }
}