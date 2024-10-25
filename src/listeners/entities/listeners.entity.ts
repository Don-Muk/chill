import { MusicEntity } from "src/music/entities/music.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Listeners {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    musicId: number;

    @ManyToOne(() => User, user => user.listeners)
    user: User;

    @ManyToOne(() => MusicEntity, music => music.listeners)
    music: MusicEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}