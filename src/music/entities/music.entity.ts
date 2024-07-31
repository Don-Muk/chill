import { Albums } from "src/albums/entities/albums.entity";
import { Author } from "src/authors/entities/authors.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
