import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Ticket } from './Ticket';


@Entity()
export class WorkService extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    description: string;

    @Column()
    price: string;

    @OneToMany(() => Ticket, ticket => ticket.client)
    tickets: Ticket[];

}