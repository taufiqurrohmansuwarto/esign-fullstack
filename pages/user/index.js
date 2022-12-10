import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/users.services";
import { Skeleton, Typography } from "antd";
import UserLayout from "../../components/UserLayout";

function index() {
  const { data, isLoading } = useQuery(["users"], () => getUsers(), {});
  return (
    <UserLayout>
      <div>
        <Typography.Title level={2}>Users</Typography.Title>
      </div>
    </UserLayout>
  );
}

export default index;
