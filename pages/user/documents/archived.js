import UserLayout from "@/components/UserLayout";

const Archived = () => {
  return <div>Activity Log</div>;
};

Archived.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

export default Archived;
