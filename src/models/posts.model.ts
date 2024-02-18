import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Login, } from "./login.model";
import { Comments } from "./comments.model";
import { Likes } from "./likes.model";

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    post_id!: number;


    @CreateDateColumn({ nullable: true })
    post_date!: Date

    @Column()
    post_title!: string;

    @Column({ type: "text" })
    post_content!: string


    @Column()
    post_login_id!: number;

    @Column()
    post_media!: string


    @ManyToOne(type => Login, (login) => login.post, { onDelete: "CASCADE" })
    @JoinColumn({ name: "post_login_id" })
    login!: Login


    @OneToMany(type => Comments, (comments) => comments.posts, { onDelete: "CASCADE" })
    comments!: Comments[]



    @OneToMany(type => Likes, (likes) => likes.posts, { onDelete: "CASCADE" })
    likes!: Likes[]



}