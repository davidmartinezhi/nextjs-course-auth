import { getSession } from "next-auth/client";
import UserProfile from "../components/profile/user-profile";

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  //page will only render if we are authenticated
  const session = await getSession({ req: context.req });

  //not logged in
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  //logged in
  return {
    props: {
      session,
    },
  };
}

export default ProfilePage;
