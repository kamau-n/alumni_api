import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Institution } from "./institution.model";
import { Chat } from "./chat.model";

@Entity()
export class InstitutionConnection {
    @PrimaryGeneratedColumn()
    institution_connection_id!: number;


    @Column()
    institution_connection_instution_id!: number

    @Column()
    institution_connection_chat_id!: number


    @ManyToOne(type => Institution, (institution) => (institution.institutionconnection), { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "institution_connection_instution_id" })
    institution!: Institution

    @OneToOne(type => Chat, (chat) => (chat.institutionconnection), { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "institution_connection_chat_id" })
    chat!: Chat




}