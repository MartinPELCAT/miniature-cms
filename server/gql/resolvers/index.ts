import { NonEmptyArray } from "type-graphql";
import { SystemResolver } from "./SystemResolver";
import { UserResolver } from "./UserResolver";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  UserResolver,
  SystemResolver,
];
