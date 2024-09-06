import { Module } from '@nestjs/common';
import { ListenersController } from './listeners.controller';
import { ListenersRepository } from './Listeners.repository';
import { ListenersService } from './listeners.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listeners } from './entities/listeners.entity';
import { MusicModule } from 'src/music/music.module';

@Module({
    imports: [TypeOrmModule.forFeature([Listeners]),MusicModule],
    controllers: [ListenersController],
    providers: [ListenersService, ListenersRepository],
    exports: [ListenersRepository]
})
export class ListenersModule {}