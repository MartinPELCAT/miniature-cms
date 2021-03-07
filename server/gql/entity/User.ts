import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BaseEntity,
  JoinTable,
} from "typeorm";
import { Lazy } from "../helpers";
import { Role, ROLE_ENUM } from "./Role";

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

  @Column({ unique: true })
  @Field()
  username!: string;

  @Column()
  password!: string;

  @ManyToMany(() => Role)
  @Field(() => [ROLE_ENUM])
  @JoinTable()
  roles!: Lazy<Role[]> | ROLE_ENUM[];
}
