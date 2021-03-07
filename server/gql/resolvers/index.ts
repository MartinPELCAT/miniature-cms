import { NonEmptyArray } from "type-graphql";
import { SystemResolver } from "./system-resolver";
import { UserResolver } from "./user-resolver";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  UserResolver,
  SystemResolver,
];
