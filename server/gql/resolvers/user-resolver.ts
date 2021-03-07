import { User } from "../entity/User";
import {
  Arg,
  Ctx,
  FieldResolver,
  ForbiddenError,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getRepository, Repository } from "typeorm";
import { Role } from "../entity/Role";
import { KoaContext } from "server/types/koa-types";
import { LoginInput } from "../inputs/user-inputs";
import { compare } from "bcrypt";

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Query(() => [User], { nullable: true })
  async users(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Query(() => User)
  me(@Ctx() { session }: KoaContext) {
    if (!session?.user) throw new ForbiddenError();
    return User.findOne(session.user.id);
  }

  @FieldResolver()
  async roles(@Root() user: User): Promise<string[]> {
    const found = await getRepository(User).findOne(user.id, {
      relations: ["roles"],
    });
    const roles = (await found!.roles) as Role[];
    const formatedRoles = roles.map((rle) => rle.name);
    return formatedRoles;
  }

  @Mutation(() => User)
  async login(
    @Arg("input") { username, password }: LoginInput,
    @Ctx() { session }: KoaContext
  ) {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({
      where: { username },
      relations: ["roles"],
    });

    if (!user) throw new Error("User not found");
    const isValid = await compare(password, user.password);
    if (!isValid) throw new Error("User not found");
    user.password = undefined!;
    session!.user = user;
    return user;
  }
}
