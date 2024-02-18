import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Institution } from "./institution.model";
import { Login, } from "./login.model";

@Entity()
export class Alumni {
    @PrimaryGeneratedColumn()
    alumni_id!: number

    @Column()
    alumni_login_id!: number

    @Column()
    alumni_institution_id!: number

    @Column()
    alumni_graduation_year!: string;




    @ManyToOne(type => Institution, (institution) => institution.alumni, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "alumni_institution_id" })
    institution!: Institution;


    @OneToOne(() => Login, login => login.alumni)
    @JoinColumn({ name: "alumni_login_id" })
    login!: Login;



}