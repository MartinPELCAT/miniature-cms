import { exec } from "child_process";
import { Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";

@Resolver()
@Service()
export class SystemResolver {
  @Mutation(() => Boolean)
  async reload() {
    exec("pm2 reload all");
    return true;
    // return true;
  }
}
