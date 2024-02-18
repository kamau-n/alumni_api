import { Admin, DataSource } from "typeorm";
import { Users } from "../models/users.model";




export const appDataSource = new DataSource({
    type: "mysql",
    host: "54.91.43.57:3306/alumnet",
    port: 3306,
    database: "alumnet",
    username: "kamau",
    password: "Kamau_016",
    logging: true,
    synchronize: true,
    entities: [Users]



})