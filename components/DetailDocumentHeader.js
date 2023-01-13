import { useRouter } from "next/router";
import PageContainer from "./pro/PageContainer";
import { Button, Card, Divider, Space, Tag } from "antd";
import { useQuery } from "@tanstack/react-query";
import { detailDocument } from "@/services/users.services";
import { capitalize } from "@/lib/client-utils";

const Content = ({ data }) => {
  return (
    <>
      <Space>
        {data?.filename}
        <Tag>{capitalize(data?.workflow)}</Tag>
      </Space>
    </>
  );
};

const DetailDocumentHeader = ({
  children,
  tabActiveKey,
  title = "Document View",
}) => {
  const router = useRouter();

  const { data, isLoading } = useQuery(
    ["document", router.query.id],
    () => detailDocument(router.query.id),
    {
      enabled: !!router.query.id,
    }
  );

  const handleBack = () => router.push("/user/documents/all");

  return (
    <PageContainer
      loading={isLoading}
      title={title}
      tabActiveKey={tabActiveKey}
      onBack={handleBack}
      onTabChange={(key) => {
        router.push(`/user/document/${router.query.id}/${key}`);
      }}
      content={<Content data={data} />}
      tabList={[
        {
          tab: "Document",
          key: "view",
        },
        {
          tab: "Information",
          key: "information",
        },
        {
          tab: "Recipients",
          key: "recipients",
        },
        {
          tab: "Discussions",
          key: "discussions",
        },
      ]}
      extra={[
        <Button key="1" type="primary">
          Download
        </Button>,
      ]}
    >
      {children}
    </PageContainer>
  );
};

export default DetailDocumentHeader;
