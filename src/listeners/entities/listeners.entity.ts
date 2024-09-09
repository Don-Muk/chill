import { MusicEntity } from "src/music/entities/music.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Listeners {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    musicId: number;

    @ManyToOne(() => User, user => user.listeners, { eager: true })
    user: User;

    @OneToMany(() => MusicEntity, music => music.listeners, { eager: true })
    music: MusicEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}