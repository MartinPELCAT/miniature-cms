import { User } from "../entity/User";
import {
  Ctx,
  FieldResolver,
  ForbiddenError,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getRepository, Repository } from "typeorm";
import { Role } from "../entity/Role";
import { KoaContext } from "server/types/koa-types";

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
}
