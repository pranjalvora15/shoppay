import { getSession } from "next-auth/react";
import Layout from "../../components/profile/layout";
export default function Profile({ user, tab }) {
  const country= {
        name: "IN",
        flag: "https://cdn.ipregistry.co/flags/emojitwo/in.svg",
      }
  return <Layout session={user.user} tab={tab} country={country}></Layout>;
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;
  return {
    props: {
      user: session,
      tab,
   
    },
  };
}
