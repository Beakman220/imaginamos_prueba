import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    firstName: string;

    @Column({type: "varchar", nullable: true, length: 20})
    lastName: string;

    @Column()
    documentType: string;

    @Column()
    document : string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    cellphone: string;

/*     @Column()
    createdAt: Date;

    @Column()
    updateAt: Date; */

/*     @OneToMany((type) => Ticket, ticket => ticket.client)
    tickets: Ticket[]; */
}