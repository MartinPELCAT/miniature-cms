import { RouterParamContext } from "@koa/router";
import Koa, { ParameterizedContext } from "koa";

export type KoaContext = ParameterizedContext<
  any,
  RouterParamContext<any, {}>,
  any
>;

export type KoaApp = Koa<Koa.DefaultState, Koa.DefaultContext>;
