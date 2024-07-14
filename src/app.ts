import express, { response } from "express"


import bodyParser from "body-parser";
import { createServer } from 'http';
import { instRouter } from "./routes/institution.route"
import { alumniRoute } from "./routes/alumni.route"
import { Server as SocketIOServer } from 'socket.io';

import { appDataSource } from "./connection/configuration"
import authRouter from "./routes/auth.routes";
import cors from "cors"
import http from "http"
import cookieParser from "cookie-parser";
import { postRouter } from "./routes/posts.routes";
import { eventsRouter } from "./routes/events.routes";
import { chatRouter } from "./routes/chat.routes";
import { Messages } from "./models/messages.models";
import { interestsRoute } from "./routes/interests.route";
import { adminRouter } from "./routes/admin.routes";
import { HomeRouter } from "./routes/homes.routes";



// import commentRouter from "./Routes/comments.routes";
// import userRouter from "./Routes/user.routes";
// import mailRouter from "./Routes/mailer.routes"
// import activateRouter from "./Routes/activator.routes";


const app = express()

const PORT  = 8081

const server = http.createServer(app);
export const io = new SocketIOServer(server, {
  cors: {
    origin: "",
    methods: ["GET", "POST"]
  }
});



const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "DELETE"],
  credentials: true,

}
  ;
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))



app.use(express.json())
app.use("/",HomeRouter, authRouter, instRouter, alumniRoute, postRouter, eventsRouter, chatRouter, interestsRoute, adminRouter)





appDataSource.initialize()
  .then(() => { console.log("the connection has been established") })
  .catch((err: any) => {
    console.log("there was a problem in the connection" + err)
   // response.json({ mg: "unable to connect to server" })
  })





io.on('connection', (socket) => {
  console.log("connection established : " + socket.id);




  socket.on("join_chat", (data) => {
    console.log("joining chat " + data)

    socket.join(data)
    console.log("joining room  : " + data)



  })




  socket.on("Send", async (data) => {
    console.log(data)
    try {
      //await appDataSource.getRepository(Messages).save(data)
      const new_message = data
      console.log(new_message)
      if (new_message.message_receiver_id == '') {
        new_message["message_receiver_id"] = null
      }
      console.log(new_message)
      await appDataSource.getRepository(Messages).save(new_message)
      console.log(data.message_chat_id)
      const messages = await appDataSource.getRepository(Messages).find({
        where: {
          message_chat_id: data.message_chat_id
        }
        , relations: {
          sender: true,
          receiver: true
        }
      })

      console.log(data.message_chat_id)


      socket.to(data.message_chat_id).emit("Received", messages)

    } catch (error) {
      console.log(error)


    }


  })

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  // Add more event handlers here as needed
})








try {
  server.listen(PORT, () => {
    console.log("we have been connectefd to a port" + PORT)
  })

}
catch (err) {
  response.json({ msg: "internal server error" })
  console.log(err)

}
