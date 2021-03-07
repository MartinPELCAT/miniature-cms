import { User } from "../../../gql/entity/User";
import { getRepository } from "typeorm";
import { Role, ROLE_ENUM } from "../../../gql/entity/Role";
import { KoaMiddleware } from "../../../types/koa-types";
import { hashPassword } from "../../../utils/password-utils";

export const setupAdmin: KoaMiddleware = async (ctx) => {
  const { username, password } = ctx.request.body;

  const roleRepo = getRepository(Role);
  const adminRole = await roleRepo.findOne({
    where: { name: ROLE_ENUM.ADMIN },
  });

  const hashedPassword = await hashPassword(password);
  const userRepo = getRepository(User);
  const user = userRepo.create({
    username,
    password: hashedPassword,
    roles: [adminRole],
  });

  await userRepo.save(user);
  user.password = undefined!;
  ctx.session!.user = user;
  ctx.body = user;
};
