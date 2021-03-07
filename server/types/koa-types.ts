import { RouterParamContext } from "@koa/router";
import { IncomingMessage, ServerResponse } from "http";
import Koa, { Middleware, ParameterizedContext } from "koa";
import { UrlWithParsedQuery } from "url";

export type KoaContext = ParameterizedContext<
  any,
  RouterParamContext<any, {}>,
  any
>;

export type KoaApp = Koa<Koa.DefaultState, Koa.DefaultContext>;

export type KoaHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  parsedUrl?: UrlWithParsedQuery | undefined
) => Promise<void>;

export type KoaMiddleware = Middleware<any, {}>;

export type KoaCustomReq = IncomingMessage & { session: any };
