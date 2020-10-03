import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { SubmissionTypeRequirement } from "./submission-type-requirement.entity";

@Entity()
export class SubmissionType extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('text', { nullable: true })
  description: string

  @Column({ default: true })
  active: boolean

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  // relation
  @OneToMany(type => SubmissionTypeRequirement, submissionTypeRequirement => submissionTypeRequirement.submissionType)
  submissionTypeRequirement: SubmissionTypeRequirement[]

}