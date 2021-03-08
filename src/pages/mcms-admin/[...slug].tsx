import { GetServerSideProps } from "next";

export default function AdminBlocker() {
  return null;
}

//redirect all unkown pages in admin folder to mcms-admin index.tsx
export const getServerSideProps: GetServerSideProps = async () => {
  return { redirect: { destination: "/mcms-admin", permanent: false } };
};
