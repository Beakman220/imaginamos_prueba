import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Ticket } from './Ticket';
@Entity()
export class Client extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false, length: 20})
    firstName: string;

    @Column({type: "varchar", nullable: false, length: 20})
    lastName: string;

    @Column({type: "varchar", nullable: false, length: 20})
    documentType: string;

    @Column({type: "varchar", nullable: false, unique: true})
    document : string;

    @Column({type: "varchar", nullable: false, unique: true})
    email: string;

    @Column({type: "varchar", nullable: false, length: 60})
    address: string;

    @Column({type: "varchar", nullable: false, unique: true})
    cellphone: string;

    @CreateDateColumn({nullable: false})
    created_at: Date;

    @UpdateDateColumn({nullable: false})
    updated_at: Date;

    @OneToMany(() => Ticket, ticket => ticket.client)
    tickets: Ticket[];
}