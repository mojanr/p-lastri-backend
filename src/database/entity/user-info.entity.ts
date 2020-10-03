import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserInfo extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  address: string

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  // // relation
  // @OneToOne(type => User)
  // @JoinColumn()
  // user: User

}