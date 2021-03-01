import { User } from "../../server/entity/User";
import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Query(() => User, { nullable: true })
  async users(): Promise<User[]> {
    return this.userRepository.find();
  }
}
