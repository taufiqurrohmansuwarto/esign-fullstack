import UserLayout from "@/components/UserLayout";

const ChangePassword = () => {
  return <div>Change password</div>;
};

ChangePassword.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

ChangePassword.Auth = {
  role: "USER",
};

export default ChangePassword;
