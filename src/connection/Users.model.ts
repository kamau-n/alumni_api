import { Admin, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Login {

    @PrimaryGeneratedColumn()
    user_id!: number;

    @Column()
    user_name!: Text;

    @Column()
    user_email!: Text;















}/*  */