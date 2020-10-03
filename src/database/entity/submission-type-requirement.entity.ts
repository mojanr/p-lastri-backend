import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { SubmissionType } from "./submission-type.entity";

@Entity()
export class SubmissionTypeRequirement extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: 1 })
  order: number

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column()
  template: string

  @Column({ default: false })
  required: boolean

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @DeleteDateColumn()
  deletedDate: Date

  // relation
  @ManyToOne(type => SubmissionType, submissionType => submissionType.submissionTypeRequirement)
  submissionType: SubmissionType

}