import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";
import { getHistories } from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";
import { Card, Table } from "antd";
import { useState } from "react";

const ActivityLog = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 20,
  });

  const { data, isLoading } = useQuery(
    ["histories"],
    () => getHistories(query),
    {
      enabled: !!query,
    }
  );

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "IP Address",
      dataIndex: "ip_address",
      key: "ip_address",
    },
  ];

  return (
    <PageContainer title="Activity Log">
      <Card>
        <Table
          loading={isLoading}
          rowKey={(row) => row?.id}
          columns={columns}
          dataSource={data?.result}
          pagination={{
            current: data?.page,
            pageSize: data?.limit,
            total: data?.total,
            onChange: (page, limit) => {
              setQuery({ ...query, page, limit });
            },
          }}
        />
      </Card>
    </PageContainer>
  );
};

ActivityLog.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

ActivityLog.Auth = {
  role: "USER",
};

export default ActivityLog;
