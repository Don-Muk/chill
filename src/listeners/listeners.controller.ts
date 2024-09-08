import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UpdateListenersDto } from './dto/update-listeners.dto';
import { CreateListenersDto } from './dto/create-listeners.dto';
import { ListenersService } from './listeners.service';
import { PublicGuard } from 'src/auth/guards/public.guard';
import { UserGuard } from 'src/auth/guards/user.guard';

@Controller('listeners')
export class ListenersController {
constructor(private readonly listenersService: ListenersService) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createListenersDto: CreateListenersDto) {
    return this.listenersService.create(createListenersDto);
  }

  @UseGuards(PublicGuard)
  @Get()
  findAll() {
    return this.listenersService.findAll();
  }

  @UseGuards(PublicGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listenersService.findOne(+id);
  }

  @UseGuards(UserGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListenersDto: UpdateListenersDto) {
    return this.listenersService.update(+id, updateListenersDto);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listenersService.remove(+id);
  }
}