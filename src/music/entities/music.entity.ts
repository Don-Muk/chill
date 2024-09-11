import { Albums } from "src/albums/entities/albums.entity";
import { Author } from "src/authors/entities/authors.entity";
import { Listeners } from "src/listeners/entities/listeners.entity";
import { Playlist } from "src/playlist/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MusicEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    name: string;

    @Column()
    url: string;

    @ManyToOne(() => Author, author => author.music)
    author: Author;

    @ManyToOne(() => Albums, albums => albums.music)
    albums: Albums;

    @ManyToMany(() => Playlist, playlist => playlist.music)
    playlist: Playlist[];

    @ManyToMany(() => Listeners, listeners => listeners.user)
    listeners: Listeners[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
