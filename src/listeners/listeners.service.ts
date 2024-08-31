import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listeners } from './entities/listeners.entity';
import { Repository } from 'typeorm';
import { ListenersRepository } from './Listeners.repository';
import { CreateListenersDto } from './dto/create-listeners.dto';
import { UpdateListenersDto } from './dto/update-listeners.dto';

@Injectable()
export class ListenersService {
    constructor(@InjectRepository(Listeners) private readonly listenersRepo: Repository<Listeners>, private readonly ListenersRepository: ListenersRepository){}

    async findAll() {
        try {
            return await this.ListenersRepository.findAll();
        } catch (error) {
            throw new InternalServerErrorException('Error fetching listeners');
        }
    }

    async findOne(id: number) {
        try {
            const listeners = await this.ListenersRepository.findOne(id);
            if (!listeners) {
                throw new NotFoundException(`Listeners with ID ${id} not found`);
            }
            return listeners;
        } catch (error) {
            throw new InternalServerErrorException('Error fetching listener');
        }
    }

    async create(data: CreateListenersDto): Promise<Listeners> {
        try {
            const newListeners = this.listenersRepo.create(data);
            return await this.listenersRepo.save(newListeners);
        } catch (error) {
            throw new InternalServerErrorException('Error creating listener');
        }
    }
    
    async update(id: number, data: UpdateListenersDto): Promise<Listeners> {
        try {
            const listeners = await this.ListenersRepository.findOne(id);
            await this.listenersRepo.update(id, data);
            return listeners;
        } catch (error) {
            throw new InternalServerErrorException('Error updating listener');
        }
    }

    async remove(id: number) {
        try {
            const listeners = await this.findOne(id);
            await this.listenersRepo.remove(listeners);
        } catch (error) {
            throw new InternalServerErrorException('Error removing listener');
        }
    }
}