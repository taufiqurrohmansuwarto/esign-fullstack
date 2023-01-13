import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";
import { formatDate } from "@/lib/client-utils";
import { getHistories } from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";
import { Card, Row, Table, Col, Avatar, Typography } from "antd";
import { useState } from "react";

const TitleHistory = ({ row }) => {
  const { type } = row;

  if (type === "ACCOUNT") {
    return (
      <Row gutter={[16, 8]}>
        <Col>
          <Avatar src={row?.user?.image} />
        </Col>
        <Col>
          <Row>
            <Typography.Text strong>{row?.user?.username}</Typography.Text>
          </Row>
          <Row>
            <Typography.Text type="secondary">
              {formatDate(row?.created_at)}
            </Typography.Text>
          </Row>
        </Col>
      </Row>
    );
  } else if (type === "DOCUMENT") {
    return <Row></Row>;
  }
};

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
      refetchOnWindowFocus: false,
    }
  );

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => <TitleHistory row={record} />,
    },
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
      title: "Info",
      dataIndex: "useragent",
      key: "useragent",
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
          size="middle"
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
