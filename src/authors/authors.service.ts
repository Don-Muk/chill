import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorRepository } from './authors.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/authors.entity';
import { UpdateAuthorDto } from './dtos/update-authors.dto';
import { CreateAuthorDto } from './dtos/create-authors.dto';

@Injectable()
export class AuthorService {
    constructor(@InjectRepository(Author) private readonly authorRepo: Repository<Author>, private readonly authorRepository: AuthorRepository){}

    findAll(){
        return this.authorRepository.findAll();
    }

    async findOne(id: number){
        const author = await this.authorRepository.findOne(id);
        if (!author) {
            throw new NotFoundException(`Author with ID ${id} not found`);
        }
        return author;
    }

    create(data: CreateAuthorDto): Promise<Author> {
        const newAuthor = this.authorRepo.create(data);
        return this.authorRepo.save(newAuthor);
    }
    
    async update(id: number, data: UpdateAuthorDto): Promise<Author> {
        const author = await this.authorRepository.findOne(id);
        if (!author) {
            throw new NotFoundException(`Author with ID ${id} not found`);
        }
        await this.authorRepo.update(id, data);
        return this.findOne(id);
    }

    async remove(id: number){
        const author = await this.findOne(id);
        await this.authorRepo.remove(author);
    }
}
