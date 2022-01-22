import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Ticket } from './Ticket';

@Entity()
export class WorkService extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false, unique: true})
    description: string;

    @Column({type: "varchar", nullable: false})
    price: string;

    @CreateDateColumn({nullable: false})
    created_at: Date;

    @UpdateDateColumn({nullable: false})
    updated_at: Date;

    @OneToMany(() => Ticket, ticket => ticket.client)
    tickets: Ticket[];
}