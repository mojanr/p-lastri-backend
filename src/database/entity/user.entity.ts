import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Role } from "./role.entity";
import { UserInfo } from "./user-info.entity";

@Entity()
// @Unique(['username', 'email'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  rememberToken: string

  @Column({ default: true })
  active: boolean

  @Column({ default: 0 })
  wrongPasswordCount: number

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  // relation
  @ManyToOne(type => Role, role => role.users)
  role: Role

  @OneToOne(type => UserInfo)
  @JoinColumn()
  info: UserInfo

  // lock user
  public lock() {
    this.active = false
  }

  // unlock user
  public unlock() {
    this.active = true
  }

  // is user lock
  public isLock(): boolean {
    return this.active
  }

  // set counter wrong password
  public increaseWrongPasswordCount() {
    this.wrongPasswordCount += 1
    // if wrong password counter > 3, then lock user
    this.wrongPasswordCount > 3 && this.lock()
  }

  // reset counter wrong password
  public resetWrongPasswordCount() {
    // set wrong password count to zero
    this.wrongPasswordCount = 0
    // unlock user
    this.unlock()
  }

  // set password
  public async setPassword(password: string) {
    // const salt = await Crypt.generateSalt()
    // this.password = await Crypt.generateHash(password, salt)
  }

  // validate password
  public async isPasswordValid(password: string): Promise<boolean> {
    // return await Crypt.validate(password, this.password)
    return false
  }

}