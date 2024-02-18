import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Institution } from "./institution.model";

@Entity()
export class Events {

    @PrimaryGeneratedColumn()
    event_id!: number;

    @Column({ type: "text" })
    event_description!: string



    @Column()
    event_location !: string;

    @Column({ default: 0 })
    event_reservations!: number;

    @Column({ type: "date" })
    event_date!: Date

    @Column({ type: "text", nullable: true })
    event_poster!: string

    @Column({ type: "time" })
    event_time!: Date

    @Column()
    event_institution_id!: number;

    @ManyToMany(type => Institution, (institution) => institution.events, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "event_institution_id" })
    institution!: Institution



}