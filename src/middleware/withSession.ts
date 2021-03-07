import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "node:querystring";
import { KoaCustomReq } from "server/types/koa-types";
import { User } from "../../server/gql/entity/User";

export type ServerSideConnectedProps = { user: User | undefined };

export const getConnectedUser = (
  context: GetServerSidePropsContext
): User | null => {
  const request = (context.req as unknown) as KoaCustomReq;
  const session = request.session;
  return session?.user || null;
};

export const withSession = <
  P extends { [key: string]: unknown } = { [key: string]: unknown },
  Q extends ParsedUrlQuery = ParsedUrlQuery
>(
  cb: (
    context: GetServerSidePropsContext<Q>,
    user: User
  ) => Promise<GetServerSidePropsResult<P & ServerSideConnectedProps>>
) => {
  return async (context: GetServerSidePropsContext<Q>) => {
    const user = getConnectedUser(context);
    if (!user) return redirectPath();
    return cb(context, user);
  };
};

const redirectPath = (): {
  redirect: { destination: string; permanent: boolean };
} => {
  return {
    redirect: {
      destination: "/mcms-admin/login",
      permanent: false,
    },
  };
};
