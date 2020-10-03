import { NotImplementedException } from "@nestjs/common";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class SubmissionRequirementApproval extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  // submission requirement id

  // user id


  // status
  /*
    100 = draft
    101 = submit
    102 = approve
    103 = reject
    104 = complete
  */
  @Column({ default: 100 })
  status: number

  // reject reason
  @Column()
  reason: string

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  // set reason
  private setReason(reason: string = null) {
    this.reason = reason
  }

  // draft
  public draft() {
    this.status = 100
    this.setReason()
  }

  // submit
  public submit() {
    this.status = 101
    this.setReason()
  }

  // approve
  public approve() {
    this.status = 102
    this.setReason()
  }

  // reject
  public reject(reason: string) {
    this.status = 103
    this.setReason(reason)
  }

  // complete
  public complete() {
    this.status = 104
    this.setReason()
  }


}