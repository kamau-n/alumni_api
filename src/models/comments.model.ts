import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./posts.model";
import { Login } from "./login.model";
import { type } from "os";
import { CommentsReply } from "./comment-reply.model";

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    comment_id!: number;

    @Column()
    comment_login_id!: number;

    @Column()
    comment_post_id!: number;


    @CreateDateColumn({ nullable: true })
    comment_date!: Date;

    @Column({ type: "text" })
    comment_content!: string;

    @ManyToOne(type => Posts, (posts) => posts.comments, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "comment_post_id" })
    posts!: Posts;

    @ManyToOne(type => Login, (login) => login.comments, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "comment_login_id" })
    login!: Login;

    @OneToMany(type => CommentsReply, (comments_reply) => comments_reply.comments, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    comments_reply!: CommentsReply[]



}