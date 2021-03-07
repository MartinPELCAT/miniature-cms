import { GetServerSideProps } from "next";
import { AdminLayout } from "src/layouts/admin-layout";
import { withSession } from "src/middleware/withSession";

export default function McmsAdmin() {
  return <AdminLayout>Oui</AdminLayout>;
}

export const getServerSideProps: GetServerSideProps = withSession(
  async (_context, user) => {
    return {
      props: { user },
    };
  }
);
