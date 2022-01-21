import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Ticket } from './Ticket';

@Entity()
export class Technical extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: true, length: 20})
    firstName: string;

    @Column({type: "varchar", nullable: true, length: 20})
    lastName: string;

    @Column({type: "varchar", nullable: true, length: 20})
    documentType: string;

    @Column({type: "varchar", nullable: true, unique: true})
    document : number;

    @Column({type: "varchar", nullable: true, unique: true})
    email: string;

    @Column({type: "varchar", nullable: true, length: 20})
    address: string;

    @Column({type: "varchar", nullable: true, unique: true})
    cellphone: string;

    @Column({type: "varchar", nullable: true, length: 20})
    genero: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Ticket, ticket => ticket.client)
    tickets: Ticket[];

}