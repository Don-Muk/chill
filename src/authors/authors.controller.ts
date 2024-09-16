import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthorService } from './authors.service';
import { CreateAuthorDto } from './dtos/create-authors.dto';
import { UpdateAuthorDto } from './dtos/update-authors.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthorGuard } from 'src/auth/guards/author.guard';
import { PublicGuard } from 'src/auth/guards/public.guard';

@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService){}
    
    @UseGuards(AdminGuard)
    @Get()
    findAll(){
        return this.authorService.findAll();
    }

    @UseGuards(AuthorGuard)
    @Get(':id')
    findOne(@Param('id') id: string){
        const author = this.authorService.findOne(+id);
        if (!author) {
            throw new NotFoundException(`Author with ID ${id} not found`); // Use NotFoundException for better error handling
        }
        return author;
    }

    @UseGuards(PublicGuard)
    @Post()
    create(@Body() createAuthorDto: CreateAuthorDto){
        return this.authorService.create(createAuthorDto);
    }

    @UseGuards(AuthorGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto){
        return this.authorService.update(+id, updateAuthorDto);
    }

    @UseGuards(AuthorGuard)
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.authorService.remove(+id);
    }
}
