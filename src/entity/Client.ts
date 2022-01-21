import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Ticket } from './Ticket';
@Entity()
export class Client extends BaseEntity{

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

    @OneToMany(() => Ticket, ticket => ticket.client)
    tickets: Ticket[];

/*     @Column()
    createdAt: Date;

    @Column()
    updateAt: Date; */

/*     @OneToMany((type) => Ticket, ticket => ticket.client)
    tickets: Ticket[]; */
}