import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumsRepository } from './albums.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Albums } from './entities/albums.entity';
import { CreateAlbumsDto } from './dtos/create-albums.dto';
import { UpdateAlbumsDto } from './dtos/update-albums.dto';

@Injectable()
export class AlbumsService {
    constructor(@InjectRepository(Albums) private readonly albumsRepo: Repository<Albums>, private readonly albumsRepository: AlbumsRepository){}

    findAll(){
        return this.albumsRepository.findAll();
    }

    async findAllOrderBy(){
        return await this.albumsRepository.findAllOrderBy();
    }

    async findOne(id: number){
        const album = await this.albumsRepository.findOne(id);
        if (!album) {
            throw new NotFoundException(`Album with ID ${id} not found`);
        }
        return album;
    }

    create(data: CreateAlbumsDto): Promise<Albums> {
        const newAuthor = this.albumsRepo.create(data);
        return this.albumsRepo.save(newAuthor);
    }
    
    async update(id: number, data: UpdateAlbumsDto): Promise<Albums> {
        const album = await this.albumsRepository.findOne(id);
        if (!album) {
            throw new NotFoundException(`Album with ID ${id} not found`);
        }
        await this.albumsRepo.update(id, data);
        return this.findOne(id);
    }

    async remove(id: number){
        const album = await this.findOne(id);
        await this.albumsRepo.remove(album);
    }
}
