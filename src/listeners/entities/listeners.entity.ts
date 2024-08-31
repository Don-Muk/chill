import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Listeners {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;
}