import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./posts.model";
import { Login, } from "./login.model";

@Entity()
export class Likes {
    @PrimaryGeneratedColumn()
    like_id!: number;

    @Column()
    like_login_id!: number;

    @Column()
    like_post_id!: number;


    @CreateDateColumn({ nullable: true })
    like_date!: Date;



    @ManyToOne(type => Posts, (posts) => posts.likes, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "like_post_id" })
    posts!: Posts;

    @ManyToOne(type => Login, (login) => login.likes, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "like_login_id" })
    login!: Login;



}