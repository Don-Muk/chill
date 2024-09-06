import { Listeners } from "src/listeners/entities/listeners.entity";
import { Playlist } from "src/playlist/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: 'varchar', length: 255})
    email: string;

    @Column({type: 'varchar'})
    password: string;

    @ManyToMany(() => Playlist, playlist => playlist.user)
    playlist: Playlist[];

    @OneToMany(() => Listeners, listeners => listeners.user)
    listeners: Listeners[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
