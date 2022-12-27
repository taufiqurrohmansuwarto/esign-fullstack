import UserLayout from "@/components/UserLayout";

const Pending = () => {
  return <div>Activity Log</div>;
};

Pending.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

export default Pending;
