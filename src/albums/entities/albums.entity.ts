import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}
