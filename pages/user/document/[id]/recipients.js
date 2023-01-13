import Container from "@/components/Container";
import DetailDocumentHeader from "@/components/DetailDocumentHeader";
import UserLayout from "@/components/UserLayout";
import { getRecipinents } from "@/services/users.services";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Card, Space, Table, Tooltip, Typography } from "antd";
import { useRouter } from "next/router";
import React from "react";

const Recipient = ({ recipients }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Position",
      dataIndex: "position",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  return <Table columns={columns} dataSource={recipients} pagination={false} />;
};

function Recipients() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useQuery(
    ["document-recipients", id],
    () => getRecipinents(id),
    {
      enabled: !!id,
    }
  );

  return (
    <DetailDocumentHeader title="Recipients" tabActiveKey="recipients">
      <Container>
        <Card title="Recipient" loading={isLoading}>
          <Space align="start">
            <Typography.Paragraph>Parallel</Typography.Paragraph>
            <Tooltip
              title="Recipient will be able to sign the document with following the sequence"
              placement="right"
            >
              <QuestionCircleOutlined
                style={{ fontSize: 20, cursor: "pointer" }}
              />
            </Tooltip>
          </Space>
          <Recipient recipients={data?.Recipient} />
        </Card>
      </Container>
    </DetailDocumentHeader>
  );
}

Recipients.Auth = {
  role: "USER",
};

Recipients.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default Recipients;
