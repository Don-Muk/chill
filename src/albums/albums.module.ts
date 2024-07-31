import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumsRepository } from './albums.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Albums } from './entities/albums.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Albums])],
    controllers: [AlbumsController],
    providers: [AlbumsService,AlbumsRepository],
})
export class AlbumsModule {}
