import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Music } from "./entities/music.entity";
import { Repository } from "typeorm";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";

@Injectable()
export class MusicRepository {
    constructor(
        @InjectRepository(Music)
        private readonly MusicRepo: Repository<Music>
    ) { }

    create(data: CreateMusicDto) {
        const newMusic = this.MusicRepo.create(data)

        const artist = new Artist()
        artist.id = data.artistId
        newMusic.artist = artist

        return this.MusicRepo.save(newMusic)
    }

    findAll() {
        return this.MusicRepo.createQueryBuilder('music')
            .getMany()
    }

    findOne(id: number) {
        return this.MusicRepo.createQueryBuilder('music')
            .where('music.id = :id', { id })
            .getOne()
    }

    async update(id: number, data: UpdateMusicDto) {
        await this.MusicRepo.createQueryBuilder('music')
            .update()
            .set(data)
            .where('music.id = :id', { id })
            .execute()

        return this.MusicRepo.createQueryBuilder('music')
            .where('music.id = :id', { id })
            .getOne()
    }

    async remove(id: number) {
        await this.MusicRepo.softDelete(id)

        return this.MusicRepo.createQueryBuilder('music')
            .where('music.id = :id', { id })
            .getOne()
    }
}