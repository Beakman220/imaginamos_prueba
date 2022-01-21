import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Client } from './Client';
import { Technical } from './Technical';
import { WorkService } from './WorkService';
@Entity()
export class Ticket extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: true, unique: true})
    token: string;

    @Column()
    isActive: boolean;

    @Column({type: "varchar", nullable: true, length: 20})
    note: string;

    @Column({ type: "timestamptz", nullable: true })
    service_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Client, client => client.tickets)
    client: Client;

    @ManyToOne(() => Technical, technical => technical.tickets)
    technical: Technical;

    @ManyToOne(() => WorkService, workService => workService.tickets)
    workService: WorkService;
}