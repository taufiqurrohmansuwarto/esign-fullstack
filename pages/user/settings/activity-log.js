import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";
import { formatDate } from "@/lib/client-utils";
import { getHistories } from "@/services/users.services";
import { FileOutlined } from "@ant-design/icons";
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
  } else if (type === "DOCUMENT" || type === "document") {
    return (
      <Row gutter={[16, 8]}>
        <Col>
          <FileOutlined />
        </Col>
        <Col>
          <Row>
            <Typography.Text strong>{row?.document?.filename}</Typography.Text>
          </Row>
          <Row>
            <Typography.Text type="secondary">
              {formatDate(row?.created_at)}
            </Typography.Text>
          </Row>
        </Col>
      </Row>
    );
  }
};

const ActivityLog = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 20,
    type: "all",
  });

  const { data, isLoading, isFetching } = useQuery(
    ["histories", query],
    () => getHistories(query),
    {
      enabled: !!query,
      refetchOnWindowFocus: false,
      keepPreviousData : true
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
    <PageContainer title="Activities">
      <Card>
        <Table
          size="middle"
          loading={isLoading || isFetching}
          rowKey={(row) => row?.id}
          columns={columns}
          dataSource={data?.result}
          pagination={{
            current: query.page,
            position: ["bottomRight", "topRight"],
            pageSize: data?.limit,
            total: data?.total,
            onChange: (page, limit) => {
              setQuery({ ...query, page, limit });
            },
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
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
