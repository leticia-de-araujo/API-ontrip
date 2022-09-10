import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Accommodation } from "./accommodation.entity";

@Entity("photos")
export class Photo {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  content: string;

  @ManyToOne(() => Accommodation, { eager: true })
  @JoinColumn()
  accommodation: Accommodation | null;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
