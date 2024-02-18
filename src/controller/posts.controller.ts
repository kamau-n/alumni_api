import { Request, Response } from "express";
import { appDataSource } from "../connection/configuration";
import { Posts } from "../models/posts.model";
import { Likes } from "../models/likes.model";
import { Like } from "typeorm";

export const PostController = async (req: Request, res: Response) => {
    try {

        console.log(req.body)


        await appDataSource.getRepository(Posts).save(req.body)
        res.json({ created: true, msg: "post created successfully" })

    } catch (error) {
        console.log(error)
        res.json({ msg: "Unable to create post", created: false })
    }

}

export const GetPosts = async (req: Request, res: Response) => {
    console.log("getting posts")
    const search = req.query.flt;
    console.log(search)

    if (search == null) {

        try {
            const posts = await appDataSource.getRepository(Posts).find({
                relations: {
                    likes: true,
                    comments: true, login: true
                }

            })
            console.log(posts)
            res.send(
                posts
            )



        }


        catch (error) {
            console.log(error)
            res.send([])

        }

    }
    else {

        try {
            const posts = await appDataSource.getRepository(Posts).find({
                where: [
                    { post_title: Like(`%${search}%`) },
                    { post_content: Like(`%${search}%`) },
                ],
                relations: {
                    comments: true,
                    likes: true
                }

            }

            )
            console.log(posts)
            res.send(
                posts
            )



        }


        catch (error) {
            console.log(error)
            res.send([])

        }
    }

}

export const GetUserPosts = async (req: Request, res: Response) => {
    console.log("getting user  posts")
    try {

        res.send(await appDataSource.getRepository(Posts).find(
            {

                //@ts-ignore
                where: {
                    post_login_id: req.params.id
                }
            }
        ))

    } catch (error) {
        console.log(error)
        res.send([])

    }


}


export const LikePost = async (req: Request, res: Response) => {
    try {

        console.log(req.body)

        await appDataSource.getRepository(Likes).save(req.body)
        res.json({ created: true, msg: "liked post successfully" })

    } catch (error) {
        console.log(error)
        res.json({ msg: "Unable to like post", created: false })
    }

}


export const DeletePost = async (req: Request, res: Response) => {
    console.log("Deleting an Post")

    const idToDelete: any = req.params.id

    try {
        const deleted_school = await appDataSource.getRepository(Posts).delete({

            post_id: idToDelete

        })
        res.json({ msg: "Post deleted successfully", deleted: true })

    } catch (error) {
        console.log(error)

        res.json({
            msg: "unable to delete Post", deleted: false
        })

    }

}