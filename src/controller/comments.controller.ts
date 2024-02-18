import { Request, Response } from "express";
import { appDataSource } from "../connection/configuration";
import { Comments } from "../models/comments.model";
import { CommentsReply } from "../models/comment-reply.model";

export const CreateComment = async (req: Request, res: Response) => {
    console.log(req.body)

    try {
        await appDataSource.getRepository(Comments).save(req.body)
        res.json({
            msg: "Comment added Successfully",
            commented: true
        })

    } catch (error) {
        console.log(error)
        res.json({
            msg: "unable to comment",
            commented: false
        })

    }

}


export const CreateCommentReply = async (req: Request, res: Response) => {
    console.log(req.body)

    try {
        await appDataSource.getRepository(CommentsReply).save(req.body)
        res.json({
            msg: "Comment Reply added Successfully",
            commented: true
        })

    } catch (error) {
        console.log(error)
        res.json({
            msg: "unable add comment reply",
            commented: false
        })

    }

}




export const GetPostComments = async (req: Request, res: Response) => {
    console.log(req.params)
    console.log("getting comments")
    try {
        res.send(await appDataSource.getRepository(Comments).find(
            {
                //@ts-ignore
                where: {
                    comment_post_id: req.params.id
                }
                , relations: {
                    login: true


                }
            }
        ))

    } catch (error) {
        res.send([])

    }

}

export const GetCommentReplies = async (req: Request, res: Response) => {
    console.log(req.params)
    console.log("getting comments replies")
    try {
        res.send(await appDataSource.getRepository(CommentsReply).find(
            {
                //@ts-ignore
                where: {
                    comment_reply_comment_id: req.params.id
                }
                , relations: {
                    login: true


                }
            }
        ))

    } catch (error) {
        res.send([])

    }

}


export const DeleteComment = async (req: Request, res: Response) => {
    try {

        const deleted_comments = await appDataSource.createQueryBuilder()
            .delete()
            .from(Comments)
            .where("comment_id =:id", { id: req.params.id })
            .execute()
        deleted_comments.affected == 0 ? res.json({ msg: "unable to delete comment", deleted: false }) :
            res.json({ msg: "comment deleted successfully", deleted: true })


    } catch (error) {
        console.log(error)

    }

}