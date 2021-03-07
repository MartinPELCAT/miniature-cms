import { logger } from "../../utils/logger-utils";
import { ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  getRepository,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ unique: true })
  name!: ROLE_ENUM;
}

export enum ROLE_ENUM {
  ADMIN = "ADMIN",
  READ = "READ",
  WRITE = "WRITE",
  USER = "USER",
}

registerEnumType(ROLE_ENUM, { name: "RolesEnum" });

export const seedRoles = async () => {
  logger.info("🌱 Seeding Roles");
  const roleRepo = getRepository(Role);

  const roles = await roleRepo.count();
  if (roles) return;

  const adminRole = Role.create({ name: ROLE_ENUM.ADMIN });
  const readerRole = Role.create({ name: ROLE_ENUM.READ });
  const writerRole = Role.create({ name: ROLE_ENUM.WRITE });
  const userRole = Role.create({ name: ROLE_ENUM.USER });

  await roleRepo.save([adminRole, readerRole, writerRole, userRole]);
};
