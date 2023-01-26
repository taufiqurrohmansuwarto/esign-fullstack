import Container from "@/components/Container";
import DetailDocumentHeader from "@/components/DetailDocumentHeader";
import UserLayout from "@/components/UserLayout";
import { colorOfItem, formatDate } from "@/lib/client-utils";
import {
  detailInformationDocument,
  documentHistories,
} from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Card,
  Descriptions,
  Divider,
  List,
  Skeleton,
  Space,
  Tag,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

const Owner = ({ item }) => {
  const documentOwner = item?.user?.id === item?.document?.user_id;

  if (documentOwner) {
    return <Tag color="green">OWNER</Tag>;
  } else {
    return null;
  }
};

const History = ({ item }) => {
  return (
    <List.Item key={item?.id}>
      <List.Item.Meta
        avatar={<Avatar src={item?.user?.image} />}
        title={item?.user?.username}
        description={<Owner item={item} />}
      />
      <Space size={100}>
        <Tag>{colorOfItem(item?.action)}</Tag>
        <Typography.Text type="secondary">
          {formatDate(item?.created_at)}
        </Typography.Text>
      </Space>
    </List.Item>
  );
};

const Histories = ({ documentId }) => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 5,
  });

  const { data, isLoading } = useQuery(
    ["detail-document-histories", documentId, query],
    () => documentHistories(documentId, query),
    {
      enabled: !!query,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <List
      split
      size="large"
      loading={isLoading}
      header={<Typography.Text strong>History</Typography.Text>}
      renderItem={(item) => <History item={item} />}
      dataSource={data?.result}
      pagination={{
        pageSize: query.limit,
        current: query.page,
        total: data?.total,
        onChange: (page, limit) => setQuery({ ...query, page, limit }),
      }}
    />
  );
};

const DocumentDetail = ({ documentId }) => {
  const { data, isLoading } = useQuery(["document-detail", documentId], () =>
    detailInformationDocument(documentId)
  );

  return (
    <Skeleton loading={isLoading}>
      <Descriptions title="Document" bordered layout="vertical">
        <Descriptions.Item label="Title">{data?.filename}</Descriptions.Item>
        <Descriptions.Item label="Uploaded Date">
          {formatDate(data?.created_at)}
        </Descriptions.Item>
        <Descriptions.Item label="Document Pages">
          {data?.document_pages}
        </Descriptions.Item>
        <Descriptions.Item label="Document Owner">
          <Space>
            <Avatar src={data?.uploader?.image} />
            <Typography.Text type="secondary">
              {data?.uploader?.username}
            </Typography.Text>
          </Space>
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title="My Signatures" layout="vertical">
        <Descriptions.Item>{JSON.stringify(data?.Recipient)}</Descriptions.Item>
      </Descriptions>
    </Skeleton>
  );
};

function Information() {
  const router = useRouter();
  const { id: documentId } = router.query;

  return (
    <DetailDocumentHeader title="Information" tabActiveKey="information">
      <Container>
        <Card title="Details">
          <DocumentDetail documentId={documentId} />
          <Divider />
          <Histories documentId={documentId} />
        </Card>
      </Container>
    </DetailDocumentHeader>
  );
}

Information.Auth = {
  role: "USER",
};

Information.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default Information;
