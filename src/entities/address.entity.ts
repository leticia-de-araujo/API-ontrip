import { Column, Entity, PrimaryColumn, JoinColumn, OneToOne } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("addresses")
export class Address {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  country: string;

  @Column({ length: 50 })
  state: string;

  @Column({ length: 70 })
  city: string;

  @Column({ length: 50 })
  postalCode: string;

  @Column({ length: 100 })
  street: string;

  @Column({ length: 50, nullable: true })
  complement: string;

  @Column({ length: 36 })
  accommodationId: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
