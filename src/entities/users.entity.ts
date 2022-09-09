import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 30, unique: true })
  email: string;

  @Column({ length: 500 })
  @Exclude()
  password: string;

  @Column({ length: 20 })
  dateOfBirth: string;

  @Column({ default: false })
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 5000, nullable: true })
  photo: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
