import { useLogin } from "../hooks/useLogin";

const ProfilePage = () => {
  const username = useLogin();
  return (
    <>
      <h1>Profile</h1>
      Username: {username}
    </>
  );
};

export default ProfilePage;
