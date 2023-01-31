import TabNotification from "@/components/TabNotification";
import UserLayout from "@/components/UserLayout";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import { useState } from "react";
import { getNotification } from "@/services/users.services";

const ListNotifications = () => {
  const [id, setId] = useState(0);

  const { data, isLoading } = useQuery(
    ["notification-read", id, "read"],
    () => getNotification(id, "read"),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <TabNotification tabActiveKey="read">
      <Card loading={isLoading}>{JSON.stringify(data)}</Card>
    </TabNotification>
  );
};

ListNotifications.getLayout = (page) => {
  return <UserLayout active="/user/notifications">{page}</UserLayout>;
};

ListNotifications.Auth = {
  role: "USER",
};

export default ListNotifications;
