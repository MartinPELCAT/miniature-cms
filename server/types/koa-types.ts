import { RouterParamContext } from "@koa/router";
import { IncomingMessage } from "http";
import { ServerResponse } from "http";
import Koa, { ParameterizedContext } from "koa";
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
