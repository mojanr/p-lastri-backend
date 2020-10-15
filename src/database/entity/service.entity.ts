import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Qna } from "./qna.entity";

@Entity()
export class Service extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('text', { nullable: true })
  description: string

  @Column({ default: true })
  active: boolean

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @DeleteDateColumn()
  deletedDate: Date

  // relation
  @OneToMany(type => Qna, qna => qna.service)
  qnas: Qna[]

  // lock
  public lock() {
    this.active = false
  }

  // unlock
  public unlock() {
    this.active = true
  }

}