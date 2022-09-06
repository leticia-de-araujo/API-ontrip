import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Capacity } from "./capacity.entity";
import { Category } from "./category.entity";
import { Type } from "./type.entity";
import { User } from "./users.entity";

@Entity("accommodations")
export class Accommodation {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 35 })
  name: string;

  @Column({ length: 200 })
  description: string;

  @Column({ type: "float", width: 6, scale: 2 })
  dailyPrice: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  verifiedByAdm: boolean;

  @Column({ default: false })
  specialOffer: boolean;

  @ManyToOne(() => Type, { eager: true })
  @JoinColumn()
  type: Type;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  owner: User;

  @ManyToOne(() => Capacity, { eager: true })
  @JoinColumn()
  capacity: Capacity;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn()
  category: Category;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
