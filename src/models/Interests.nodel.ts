import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { UserInterest } from "./user-interest.model"

@Entity()
export class Interests {
    @PrimaryGeneratedColumn()
    interest_id!: number

    @Column()
    interest_name!: string

    @OneToMany(type => UserInterest, (user_interest) => user_interest.interest, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    user_interest!: UserInterest[]




}