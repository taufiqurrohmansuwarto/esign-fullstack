import UserLayout from "@/components/UserLayout";

const Rejected = () => {
  return <div>Activity Log</div>;
};

Rejected.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

export default Rejected;
