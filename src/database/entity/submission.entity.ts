import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { SubmissionRequirement } from "./submission-requirement.entity";

@Entity()
export class Submission extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  // submission type id
  @Column()
  submissionTypeId: number

  // submission requirement

  // status
  /*
    100 = draft
    101 = submit
    102 = reject
    103 = approve
    104 = complete
    105 = cancel
  */
  @Column({ default: 100 })
  status: number

  @Column()
  createdBy: string

  @Column()
  name: string

  @Column({ default: 100 })
  verifikatorStatus: number

  @Column({ type: 'text', default: '' })
  comment: string

  @Column({ default: 100 })
  helpdeskStatus: number

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  // relation
  @OneToMany(type => SubmissionRequirement, submissionRequirement => submissionRequirement.submission)
  submissionRequirements: SubmissionRequirement[]

}