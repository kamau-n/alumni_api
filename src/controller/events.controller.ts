import { Request, Response } from "express";
import { appDataSource } from "../connection/configuration";
import { Events } from "../models/events.model";
import { Like } from "typeorm";

export const CreateEvent = async (req: Request, res: Response) => {
    console.log("Creating an Event")
    console.log(req.body)
    try {

        await appDataSource.getRepository(Events).save(req.body)
        res.json({ msg: "event created successfully", created: true })

    } catch (error) {
        console.log(error)
        res.json({ msg: "unable to create event", created: false })

    }

}

export const CreateReservation = async (req: Request, res: Response) => {


    //@ts-ignore
    const reservation_add = await appDataSource.getRepository(Events).increment({ event_id: req.params.id }, 'event_reservations', 1)
    res.send("added")


}

export const GetEvents = async (req: Request, res: Response) => {



    console.log("Getting Events")
    const search = req.query.flt;
    console.log(search)

    if (search == null) {


        try {
            res.send(await appDataSource.getRepository(Events).find())

        } catch (error) {
            res.send([])
            console.log(error)

        }


    }

    else {

        try {
            const events = await appDataSource.getRepository(Events).find({
                where: [
                    { event_description: Like(`%${search}%`) },
                    { event_location: Like(`%${search}%`) },
                ]
            }


            )
            console.log(events)
            res.send(
                events
            )



        }


        catch (error) {
            console.log(error)
            res.send([])

        }




    }
}


export const DeleteEvent = async (req: Request, res: Response) => {
    console.log("Deleting an event")

    const idToDelete: any = req.params.id

    try {
        const deleted_school = await appDataSource.getRepository(Events).delete({

            event_id: idToDelete

        })
        res.json({ msg: "Event delete successfully", deleted: true })

    } catch (error) {
        console.log(error)

        res.json({
            msg: "unable to delete Event", deleted: false
        })

    }

}