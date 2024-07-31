import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { AuthorService } from './authors.service';
import { CreateAuthorDto } from './dtos/create-authors.dto';
import { UpdateAuthorDto } from './dtos/update-authors.dto';

@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService){}
    
    @Get()
    findAll(){
        return this.authorService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        const author = this.authorService.findOne(+id);
        if (!author) {
            throw new NotFoundException(`Author with ID ${id} not found`); // Use NotFoundException for better error handling
        }
        return author;
    }

    @Post()
    create(@Body() createAuthorDto: CreateAuthorDto){
        return this.authorService.create(createAuthorDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto){
        return this.authorService.update(+id, updateAuthorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.authorService.remove(+id);
    }
}
