import { useRouter } from "next/router";
import PageContainer from "./pro/PageContainer";
import { Button, Card } from "antd";
import { useQuery } from "@tanstack/react-query";
import { detailDocument } from "@/services/users.services";

const DetailDocumentHeader = ({
  children,
  tabActiveKey,
  content = null,
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
      title={title}
      tabActiveKey={tabActiveKey}
      onBack={handleBack}
      onTabChange={(key) => {
        router.push(`/user/document/${router.query.id}/${key}`);
      }}
      content={<div>{data?.filename}</div>}
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
      <Card>{children}</Card>
    </PageContainer>
  );
};

export default DetailDocumentHeader;
