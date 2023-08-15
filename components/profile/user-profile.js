import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // Redirect away if NOT auth
  /*
  const [isLoading, setIsLoading] = useState(true);
  //const [loadedSession, setLoadedSession] = useState();

  useEffect(() => {
    getSession().then((session) => {
      //setLoadedSession(session);

      if (!session) {
        //if we don't find a session we navigate away
        window.location.href = "/auth";
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  //check if we are loading
  if (isLoading) {
    return <p className={classes.profile}>loading...</p>;
  }
  */

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
