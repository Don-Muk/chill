import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Listeners } from './entities/listeners.entity';
import { ListenersRepository } from './Listeners.repository';
import { CreateListenersDto } from './dto/create-listeners.dto';
import { UpdateListenersDto } from './dto/update-listeners.dto';

@Injectable()
export class ListenersService {
    constructor(private readonly listenersRepository: ListenersRepository){}

    async findAll() {
        try {
            return await this.listenersRepository.findAll();
        } catch (error) {
            throw new InternalServerErrorException('Error fetching listeners');
        }
    }

    async findOne(id: number) {
        try {
            const listeners = await this.listenersRepository.findOne(id);
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
            return await this.listenersRepository.create(data);
        } catch (error) {
            throw new InternalServerErrorException('Error creating listener');
        }
    }
    
    async update(id: number, data: UpdateListenersDto): Promise<Listeners> {
        try {
            const listeners = await this.listenersRepository.findOne(id);
            await this.listenersRepository.update(id, data);
            return listeners;
        } catch (error) {
            throw new InternalServerErrorException('Error updating listener');
        }
    }

    async remove(id: number) {
        try {
            const listener = await this.listenersRepository.findOne(id);
            if (!listener) {
                throw new NotFoundException(`Listener with ID ${id} not found`);
            }
            await this.listenersRepository.remove(id);
        } catch (error) {
            console.error('Error removing listener:', error);
            throw new InternalServerErrorException('Error removing listener');
        }
    }
}