import UserLayout from "@/components/UserLayout";

const ListNotifications = () => {
  return (
    <div>
      <h1>Notifications</h1>
    </div>
  );
};

ListNotifications.getLayout = (page) => {
  return <UserLayout active="/user/notifications">{page}</UserLayout>;
};

ListNotifications.Auth = {
  role: "USER",
};

export default ListNotifications;
