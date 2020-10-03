import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { FlowApproval } from "./flow-approval.entity";
import { Provider } from "./provider.entity";
import { User } from "./user.entity";

@Entity()
export class Role extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ default: true })
  active: boolean
  
  @Column('text', { nullable: true })
  description: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @DeleteDateColumn()
  deletedDate: Date

  // relation
  @OneToMany(type => User, user => user.role)
  users: User[]

  @OneToMany(tpye => Provider, provider => provider.role)
  providers: Provider[]

}