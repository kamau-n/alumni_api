import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Messages } from "./messages.models";
import { Login } from "./login.model";
import { InstitutionConnection } from "./institution_connection.model";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    chat_id!: number

    @Column()
    chat_status!: string

    @Column({ nullable: true })
    chat_sender_id!: string

    @Column({ nullable: true })
    chat_receiver_id!: string


    // @OneToMany(type => Messages, (messages) => messages.chat, { onDelete: "CASCADE" })
    // messages!: Messages[]

    @ManyToOne(type => Login, (sender) => sender.chat, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "chat_sender_id" })
    sender!: Login

    @OneToOne(type => InstitutionConnection, (institutionconnection) => institutionconnection.chat, { onDelete: "CASCADE" })
    institutionconnection!: InstitutionConnection;



    @ManyToOne(type => Login, (receiver) => receiver.chat2, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "chat_receiver_id" })
    receiver!: Login

}