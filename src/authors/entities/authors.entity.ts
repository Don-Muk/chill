import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({type: 'longtext'})
    biography: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}
