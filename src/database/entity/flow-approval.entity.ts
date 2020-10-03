import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class FlowApproval extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  order: number

  // relation
  @OneToOne(type => Role)
  @JoinColumn()
  role: Role

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @DeleteDateColumn()
  deletedDate: Date

}