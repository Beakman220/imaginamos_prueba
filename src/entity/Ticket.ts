import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { Client } from './Client';
import { Technical } from './Technical';
import { WorkService } from './WorkService';

@Entity()
export class Ticket extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    token: string;

    @Column()
    status: string;

    @Column()
    note: string;

    @ManyToOne(() => Client, client => client.tickets)
    client: Client;

    @ManyToOne(() => Technical, technical => technical.tickets)
    technical: Technical;

    @ManyToOne(() => WorkService, workService => workService.tickets)
    workService: WorkService;

}