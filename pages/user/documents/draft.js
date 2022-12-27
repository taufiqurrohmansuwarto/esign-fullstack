import UserLayout from "@/components/UserLayout";

const Draft = () => {
  return <div>Activity Log</div>;
};

Draft.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

export default Draft;
