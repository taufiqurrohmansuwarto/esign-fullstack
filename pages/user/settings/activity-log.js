import UserLayout from "@/components/UserLayout";

const ActivityLog = () => {
  return <div>Activity Log</div>;
};

ActivityLog.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

ActivityLog.Auth = {
  role: "USER",
};

export default ActivityLog;
