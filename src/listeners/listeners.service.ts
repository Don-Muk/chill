import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listeners } from './entities/listeners.entity';
import { Repository } from 'typeorm';
import { ListenersRepository } from './Listeners.repository';
import { CreateListenersDto } from './dtos/create-listeners.dto';
import { UpdateListenersDto } from './dtos/update-listeners.dto';

@Injectable()
export class ListenersService {
    constructor(@InjectRepository(Listeners) private readonly listenersRepo: Repository<Listeners>, private readonly ListenersRepository: ListenersRepository){}

    findAll(){
        return this.ListenersRepository.findAll();
    }

    async findOne(id: number){
        const listeners = await this.ListenersRepository.findOne(id);
        if (!listeners) {
            throw new NotFoundException(`Listeners with ID ${id} not found`);
        }
        return listeners;
    }

    create(data: CreateListenersDto): Promise<Listeners> {
        const newListeners = this.listenersRepo.create(data);
        return this.listenersRepo.save(newListeners);
    }
    
    async update(id: number, data: UpdateListenersDto): Promise<Listeners> {
        const listeners = await this.ListenersRepository.findOne(id);
        await this.listenersRepo.update(id, data);
        return listeners;
    }

    async remove(id: number){
        const listeners = await this.findOne(id);
        await this.listenersRepo.remove(listeners);
    }
}
