import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Alumni } from "./alumni.model";
import { Events } from "./events.model";
import { InstitutionAdd } from "../controller/institution.controller";
import { InstitutionConnection } from "./institution_connection.model";
import { Admins } from "./admins.model";

@Entity()
export class Institution {
    @PrimaryGeneratedColumn()
    institution_id!: number;

    @Column()
    institution_name!: string;

    @Column()
    institution_address!: string;




    @OneToMany(type => Alumni, (alumni) => alumni.institution, { onDelete: "CASCADE" })
    alumni!: Alumni[];


    @OneToMany(type => InstitutionConnection, (institutionconnection) => institutionconnection.institution, { onDelete: "CASCADE" })
    institutionconnection!: InstitutionConnection;

    @OneToMany(type => Events, (events) => events.institution, { onDelete: "CASCADE" })
    events!: Events[]


    @OneToOne(type => Admins, (admins) => admins.institution, { onDelete: "CASCADE" })
    admins!: Admins



}