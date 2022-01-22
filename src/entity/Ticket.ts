import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Client } from './Client';
import { Technical } from './Technical';
import { WorkService } from './WorkService';
@Entity()
export class Ticket extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false, unique: true})
    token: string;

    @Column({nullable: false})
    isActive: boolean;

    @Column({type: "varchar", nullable: true, length: 20})
    note: string;

    @Column({ type: "timestamptz", nullable: false })
    service_date: Date;

    @CreateDateColumn({nullable: false})
    created_at: Date;

    @UpdateDateColumn({nullable: false})
    updated_at: Date;

    @ManyToOne(() => Client, client => client.tickets)
    client: Client;

    @ManyToOne(() => Technical, technical => technical.tickets)
    technical: Technical;

    @ManyToOne(() => WorkService, workService => workService.tickets)
    workService: WorkService;
}