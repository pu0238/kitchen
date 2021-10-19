import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id?: number;

    @Column({ type: "varchar", length: 50 })
    username: string;

    @Column()
    email: string;

    @Column({ type: "varchar", length: 32 })
    password?: string;
}