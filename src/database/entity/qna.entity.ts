import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { FlowApproval } from "./flow-approval.entity";
import { Service } from "./service.entity";
// import { Provider } from "./provider.entity";
// import { User } from "./user.entity";

@Entity()
export class Qna extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  // // submission type id
  // @Column()
  // serviceId: number

  // @Column()
  // serviceName: string

  @Column()
  createdBy: string

  @Column({ nullable: true })
  answerBy: string

  @Column({ default: true })
  active: boolean
  
  @Column('text', { nullable: true })
  question: string

  @Column('text', { nullable: true })
  answer: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @DeleteDateColumn()
  deletedDate: Date

  // // relation
  // @OneToMany(type => User, user => user.role)
  // users: User[]

  // @OneToMany(tpye => Provider, provider => provider.role)
  // providers: Provider[]

  // relation
  @ManyToOne(type => Service, service => service.qnas)
  service: Service

}