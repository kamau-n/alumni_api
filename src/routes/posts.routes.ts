import { Router } from "express";
import { DeletePost, GetPosts, LikePost, PostController } from "../controller/posts.controller";
import { CreateComment, CreateCommentReply, GetCommentReplies, GetPostComments } from "../controller/comments.controller";
import { CommentsReply } from "../models/comment-reply.model";


export const postRouter = Router()

postRouter.post("/posts", PostController)
postRouter.get("/posts", GetPosts)
postRouter.delete("/posts/:id", DeletePost)
postRouter.post("/comment", CreateComment)
postRouter.get("/comments/:id", GetPostComments)
postRouter.post("/post/like", LikePost)
postRouter.post("/comments/reply", CreateCommentReply)
postRouter.get("/comments/reply/:id", GetCommentReplies)