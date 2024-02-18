import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Login } from "./login.model";
import { Interests } from "./Interests.nodel";

@Entity()
export class UserInterest {

    @PrimaryGeneratedColumn()
    user_interest_id!: number;

    @Column()
    user_interest_user_id!: number

    @Column()
    user_interest_interest_id!: number


    @ManyToOne(type => Login, (login) => login.user_interest, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "user_interest_user_id" })
    login!: Login;



    @ManyToOne(type => Interests, (interest) => interest.user_interest, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "user_interest_interest_id" })
    interest!: Interests;





}

