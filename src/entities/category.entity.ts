import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("categories")
export class Category {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
