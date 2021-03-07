/// <reference types="next" />
/// <reference types="next/types/global" />

import session from "koa-session";

// declare namespace NodeJS {
//   interface ProcessEnv {
//     DB_PORT?: string;
//     DB_USERNAME?: string;
//     DB_PASSWORD?: string;
//     DB_NAME?: string;
//     DB_HOST?: string;
//   }
// }

declare module "http" {
  export interface IncomingMessage {
    session: session.Session | null;
  }
}
