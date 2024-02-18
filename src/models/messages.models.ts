import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Login } from "./login.model";
import { Chat } from "./chat.model";

@Entity()
export class Messages {
    @PrimaryGeneratedColumn()
    message_id!: number;

    @Column()
    message_chat_id!: number;

    @Column({ type: "date" })
    message_time!: Date;


    @Column({ type: "text" })
    message_content!: string;

    @Column()
    message_sender_id!: number;

    @Column({ nullable: true })
    message_receiver_id!: number;


    @ManyToOne(type => Login, (sender) => sender.messages, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "message_sender_id" })
    sender!: Login

    @ManyToOne(type => Login, (receiver) => receiver.messages2, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "message_receiver_id" })
    receiver!: Login

    // @ManyToOne(type => Chat, (chat) => chat.messages, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    // @JoinColumn({ name: "message_chat_id" })
    // chat!: Chat



}