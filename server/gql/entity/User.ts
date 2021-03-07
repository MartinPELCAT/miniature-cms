import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BaseEntity,
  JoinTable,
  BeforeInsert,
} from "typeorm";
import { Lazy } from "../helpers";
import { Role, ROLE_ENUM } from "./Role";
import { hash } from "bcrypt";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName?: string;

  @Column()
  @Field()
  username!: string;

  @Column()
  password!: string;

  @ManyToMany(() => Role, { lazy: true })
  @Field(() => [ROLE_ENUM])
  @JoinTable()
  roles!: Lazy<Role[]> | ROLE_ENUM[];

  @BeforeInsert()
  async beforeInsert() {
    this.password = await hash(this.password, 2);
  }
}
