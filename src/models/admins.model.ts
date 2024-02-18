import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Login } from "./login.model";
import { Institution } from "./institution.model";

@Entity()

export class Admins {
    @PrimaryGeneratedColumn()
    admin_id!: string

    @Column()
    admin_user_id!: number

    @Column()
    admin_institution_id!: number

    @OneToOne(type => Login, (login) => login.admins, { onDelete: "CASCADE" })
    @JoinColumn({ name: "admin_user_id" })
    login!: Login

    @OneToOne(type => Institution, (institution) => institution.admins, { onDelete: "CASCADE" })
    @JoinColumn({ name: "admin_institution_id" })
    institution!: Institution



}