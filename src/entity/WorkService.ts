import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Ticket } from './Ticket';

@Entity()
export class WorkService extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: true, unique: true})
    description: string;

    @Column({type: "varchar", nullable: true})
    price: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Ticket, ticket => ticket.client)
    tickets: Ticket[];
}