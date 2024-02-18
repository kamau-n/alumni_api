import { Admin, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { IsEmail } from "class-validator";
import { Alumni } from "./alumni.model";
import { Posts } from "./posts.model";
import { Comments } from "./comments.model";
import { Likes } from "./likes.model";
import { CommentsReply } from "./comment-reply.model";
import { Messages } from "./messages.models";
import { Chat } from "./chat.model";
import { UserInterest } from "./user-interest.model";
import { Admins } from "./admins.model";


@Entity()
export class Login {

    @PrimaryGeneratedColumn()
    login_id!: number;


    @Column({ unique: true })
    @IsEmail()
    login_email!: string;

    @Column()
    login_name!: string;

    @Column()
    login_contact!: string;

    @Column({ length: 100 })
    login_password!: string;

    @Column()
    login_role!: string

    @Column()
    login_location!: string

    @Column({ length: 10000, nullable: true })
    login_profile_pic!: string

    @OneToOne(() => Alumni, alumni => alumni.login)
    alumni!: Alumni;

    @OneToMany(type => Posts, (post) => post.login, { onDelete: "CASCADE" })
    post!: Posts[]

    @OneToMany(type => Chat, (chat) => chat.sender, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    chat!: Chat[]


    @OneToMany(type => Chat, (chat) => chat.receiver, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    chat2!: Chat[]

    @OneToMany(type => Comments, (comments) => comments.login, { onDelete: "CASCADE" })
    comments!: Comments[]

    @OneToMany(type => Likes, (likes) => likes.login, { onDelete: "CASCADE" })
    likes!: Likes[]

    @OneToMany(type => CommentsReply, (comments_reply) => comments_reply.login, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    comments_reply!: CommentsReply[]


    @OneToMany(type => Messages, (messages) => messages.sender, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    messages!: Messages[]



    @OneToMany(type => Messages, (messages) => messages.receiver, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    messages2!: Messages[]



    @OneToMany(type => UserInterest, (user_interest) => user_interest.login, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    user_interest!: UserInterest[]



    @OneToOne(type => Admins, (admins) => admins.login, { onDelete: "CASCADE" })
    admins!: Admins











}/*  */
