import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column("varchar", { nullable: false, length: 20 })
  username: string;

  @Column("varchar", { nullable: false, length: 20, unique: true })
  email: string;

  @Column("varchar", { nullable: false, length: 50 })
  password: string;

  // Date of birth, not null, takes a string (yyyy/mm/dd) and stores a Date object
  @Column("date", { nullable: false })
  dob: string;

  @Column("boolean", { default: false })
  isAdm: boolean;

  @Column("boolean", { default: true })
  isActive: boolean;

  @Column("varchar")
  photo: string;

  // Aguardando a entity Accomodation
  /* @OneToMany((type) => Accomodation, (accomodation) => accomodation.ownerHost, {
    eager: true,
  })
  accomodations: Accomodation[]; */

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
