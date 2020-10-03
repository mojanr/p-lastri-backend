import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Provider } from "./provider.entity";
// import { Crypt } from "src/common/util/index.util";

@Entity()
// @Unique(['email'])
export class ProviderInfo extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  npwp: string

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
  // @OneToOne(type => Provider)
  // @JoinColumn()
  // provider: Provider

}