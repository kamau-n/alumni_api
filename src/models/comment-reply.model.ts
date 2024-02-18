import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./posts.model";
import { Login, } from "./login.model";
import { Comments } from "./comments.model";

@Entity()
export class CommentsReply {
    @PrimaryGeneratedColumn()
    comment_reply_id!: number;

    @Column()
    comment_reply_login_id!: number;

    @Column()
    comment_reply_comment_id!: number;


    @CreateDateColumn({ nullable: true })
    comment_reply_date!: Date;

    @Column({ type: "text" })
    comment_reply_content!: string;

    @ManyToOne(type => Comments, (comments) => comments.comments_reply, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "comment_reply_comment_id" })
    comments!: Comments;

    @ManyToOne(type => Login, (login) => login.comments_reply, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "comment_reply_login_id" })
    login!: Login;



}