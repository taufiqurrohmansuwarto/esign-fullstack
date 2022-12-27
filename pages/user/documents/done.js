import UserLayout from "@/components/UserLayout";

const Done = () => {
  return <div>Activity Log</div>;
};

Done.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

export default Done;
