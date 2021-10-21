import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id?: number;

    @Column({ type: "varchar", length: 50, unique: true})
    username: string;

    @Column({unique: true})
    email: string;

    @Column({ type: "varchar", length: 64 })
    password?: string;

    @Column({ type: "varchar", length: 32 })
    salt?: string;

    @CreateDateColumn()    
    createdDate?: Date;

    @UpdateDateColumn()    
    updatedDate?: Date;
}