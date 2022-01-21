import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Ticket } from './Ticket';

@Entity()
export class Technical extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    firstName: string;

    @Column({type: "varchar", nullable: true, length: 20})
    lastName: string;

    @Column()
    documentType: string;

    @Column()
    document : number;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    cellphone: string;

    @Column()
    genero: string;

    @OneToMany(() => Ticket, ticket => ticket.client)
    tickets: Ticket[];

/*     @Column()
    admissionDate: Date;

    @Column()
    createdAt: Date;

    @Column()
    updateAt: Date; */

 /*    @OneToMany(() => Ticket, ticket => ticket.client)
    ticket: Ticket[]; */
}