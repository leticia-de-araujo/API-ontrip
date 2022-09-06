import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("capacity")
export class Capacity {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "int", width: 2 })
  rooms: number;

  @Column({ type: "int", width: 2 })
  beds: number;

  @Column({ type: "int", width: 2, default: 1 })
  totalGuests: number;

  @Column({ type: "int", width: 2, default: 1 })
  bathrooms: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
