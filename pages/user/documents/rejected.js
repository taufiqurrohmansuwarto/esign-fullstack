import UserLayout from "@/components/UserLayout";

const Rejected = () => {
  return <div>Rejected</div>;
};

Rejected.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

export default Rejected;
