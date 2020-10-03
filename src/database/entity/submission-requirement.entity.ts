import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Submission } from "./submission.entity";

@Entity()
export class SubmissionRequirement extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  // submission id

  // submission requirement name

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

  // status
  /*
    100 = draft
    101 = submit
    102 = reject
    103 = approve
    104 = complete
  */
  @Column({ default: 100 })
  status: number

  @Column({ nullable: true })
  file: string

  @Column({ default: 100 })
  verifikatorStatus: number

  @Column({ default: 100 })
  helpdeskStatus: number

  // reject reason
  @Column({ nullable: true })
  reason: string

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  // relation
  @ManyToOne(type => Submission, submission => submission.submissionRequirements)
  submission: Submission

  // // approve
  // public approve() {
  //   this.status = 101
  // }

  // // reject
  // public reject(reason: string) {
  //   this.status = 200
  //   this.reason = reason
  // }

}