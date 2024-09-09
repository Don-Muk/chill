import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listeners } from './entities/listeners.entity';
import { CreateListenersDto } from './dto/create-listeners.dto';
import { UpdateListenersDto } from './dto/update-listeners.dto';

@Injectable()
export class ListenersRepository {
    constructor(@InjectRepository(Listeners) private readonly listenersRepo: Repository<Listeners>){}

    findAll(){
        return this.listenersRepo
        .createQueryBuilder('listeners')
        .getMany()
    }

    findOne(id: number){
        return this.listenersRepo
        .createQueryBuilder('listeners')
        .andWhere('listeners.id = :id', {id})
        .getOne()
    }

    create(data: CreateListenersDto){
        const newListeners = this.listenersRepo.create(data);
        return this.listenersRepo.save(newListeners);
    }
    
    async update(id: number, data: UpdateListenersDto){
        return await this.listenersRepo
        .createQueryBuilder('listeners')
        .update()
        .set(data)
        .andWhere('listeners.id = :id', {id})
        .execute()
    }

    remove(id: number){
        return this.listenersRepo.softDelete({ id });
    }
}