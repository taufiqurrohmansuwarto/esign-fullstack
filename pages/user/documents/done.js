import UserLayout from "@/components/UserLayout";

const Done = () => {
  return <div>done</div>;
};

Done.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

Done.Auth = {
  role: "USER",
};

export default Done;
