import UserLayout from "@/components/UserLayout";

const Expired = () => {
  return <div>Activity Log</div>;
};

Expired.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

export default Expired;
