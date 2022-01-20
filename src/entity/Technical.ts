import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
//import { Ticket } from './Ticket';

@Entity()
export class Technical {

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

/*     @Column()
    admissionDate: Date;

    @Column()
    createdAt: Date;

    @Column()
    updateAt: Date; */

 /*    @OneToMany(() => Ticket, ticket => ticket.client)
    ticket: Ticket[]; */
}