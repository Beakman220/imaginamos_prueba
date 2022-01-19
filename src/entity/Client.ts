import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
/*
    @Column()
    documentType: string;

    @Column()
    document : number;

    @Column()
    age: number;

    @Column()
    createdAt: Date;

    @Column()
    updateAt: Date; */

}