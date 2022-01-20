import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Client } from './Client';


@Entity()
export class WorkService {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    description: string;

    @Column()
    price: string;

}