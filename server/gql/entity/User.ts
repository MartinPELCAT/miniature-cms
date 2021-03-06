import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field({ nullable: true })
  id!: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  age!: number;
}
