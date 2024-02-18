import { Admin, DataSource } from "typeorm";
import { Login } from "../models/login.model";
import { Institution } from "../models/institution.model";
import { Alumni } from "../models/alumni.model";
import { Posts } from "../models/posts.model";
import { Events } from "../models/events.model";
import { Comments } from "../models/comments.model";
import { Likes } from "../models/likes.model";
import { CommentsReply } from "../models/comment-reply.model";
import { Messages } from "../models/messages.models";
import { Interests } from "../models/Interests.nodel";
import { Chat } from "../models/chat.model";
import { UserInterest } from "../models/user-interest.model";
import { InstitutionConnection } from "../models/institution_connection.model";
import { Admins } from "../models/admins.model";



export const appDataSource = new DataSource({
    type: "mysql",
    database: "alumni_db",
    username: "root",
    password: "kamau016",
    //logging: true,
    synchronize: true,
    entities: [Login, Institution, Alumni, Posts, Events, Comments, Likes, CommentsReply, Messages, Interests, Chat, UserInterest, InstitutionConnection, Admins]



})