import UserLayout from "@/components/UserLayout";

const Expired = () => {
  return <div>Expired</div>;
};

Expired.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

Expired.Auth = {
  role: "USER",
};

export default Expired;
