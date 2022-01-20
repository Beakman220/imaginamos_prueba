import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Client } from './Client';


@Entity()
export class Ticket {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    token: string;

    @Column()
    status: string;

    @Column()
    note: string;

}