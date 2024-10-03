import { MusicEntity } from "src/music/entities/music.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Albums {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'longtext'})
    title: string;

    @Column({type: 'date'})
    releaseDate: Date;

    @Column()
    artistName: string;

    @OneToMany(() => MusicEntity, music => music.albums)
    music: MusicEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
