import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 30, unique: true })
  email: string;

  @Column({ length: 50 })
  password: string;

  @Column({ length: 10 })
  DOB: string;

  @Column({ default: false })
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  photo: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
