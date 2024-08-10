import { Module } from '@nestjs/common';
import { ListenersController } from './listeners.controller';
import { ListenersRepository } from './Listeners.repository';
import { ListenersService } from './listeners.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listeners } from './entities/listeners.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Listeners])],
    controllers: [ListenersController],
    providers: [ListenersService, ListenersRepository],
})
export class ListenersModule {}
