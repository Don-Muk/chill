import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/authors.entity';
import { CreateAuthorDto } from './dtos/create-authors.dto';
import { UpdateAuthorDto } from './dtos/update-authors.dto';

@Injectable()
export class AuthorRepository {
    constructor(@InjectRepository(Author) private readonly authorRepo: Repository<Author>){}

    findAll(){
        return this.authorRepo
        .createQueryBuilder('Author')
        .getMany()
    }

    findOne(id: number){
        return this.authorRepo
        .createQueryBuilder('Author')
        .andWhere('Author.id = :id', {id})
        .getOne()
    }

    create(data: CreateAuthorDto){
        const newAuthor = this.authorRepo.create(data);
        return this.authorRepo.save(newAuthor);
    }
    
    async update(id: number, data: UpdateAuthorDto){
        await this.authorRepo
        .createQueryBuilder('aurthors')
        .update()
        .set(data)
        .andWhere('authors.id = :id', {id})
        .execute()

        return this.authorRepo.findOneBy({id})
    }

    remove(id: number){
        return this.authorRepo.softDelete({id})
    }
}