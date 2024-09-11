import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthorService } from './authors.service';
import { CreateAuthorDto } from './dtos/create-authors.dto';
import { UpdateAuthorDto } from './dtos/update-authors.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserGuard } from 'src/auth/guards/user.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/roles.enum';
import { AuthorGuard } from 'src/auth/guards/author.guard';
import { PublicGuard } from 'src/auth/guards/public.guard';


@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService){}
    
    @UseGuards(AuthGuard,AdminGuard)
    @Get()
    findAll(){
        return this.authorService.findAll();
    }

    @UseGuards(AuthGuard,AuthorGuard)
    @Get(':id')
    findOne(@Param('id') id: string){
        const author = this.authorService.findOne(+id);
        if (!author) {
            throw new NotFoundException(`Author with ID ${id} not found`);
        }
        return author;
    }

    @UseGuards(PublicGuard)
    @Post()
    create(@Body() createAuthorDto: CreateAuthorDto){
        return this.authorService.create(createAuthorDto);
    }

    @UseGuards(AuthGuard,AuthorGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto){
        return this.authorService.update(+id, updateAuthorDto);
    }

    @UseGuards(AuthGuard,AuthorGuard)
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.authorService.remove(+id);
    }
}
