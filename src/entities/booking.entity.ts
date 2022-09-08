import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Accommodation } from "./accommodation.entity";
import { User } from "./users.entity";

@Entity("bookings")
export class Booking {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 10 })
  checkIn: string;

  @Column({ length: 10 })
  checkOut: string;

  @Column({ length: 10, default: "booked" })
  status: string;

  @ManyToOne(() => Accommodation, { eager: true })
  @Exclude()
  @JoinColumn()
  accommodation: Accommodation;

  @ManyToOne(() => User, { eager: true })
  @Exclude()
  @JoinColumn()
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
