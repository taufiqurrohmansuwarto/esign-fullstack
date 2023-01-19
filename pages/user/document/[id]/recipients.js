import Container from "@/components/Container";
import DetailDocumentHeader from "@/components/DetailDocumentHeader";
import UserLayout from "@/components/UserLayout";
import { upperCase } from "@/lib/client-utils";
import { getRecipinents } from "@/services/users.services";
import { ClockCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Card, Space, Tag, Timeline, Tooltip, Typography } from "antd";
import { useRouter } from "next/router";

const Recipient = ({ document }) => {
  const documentStatus = document?.status?.toLowerCase();

  const router = useRouter();

  const addRecipient = () =>
    router.push(`/user/document/${document?.id}/add-recipient`);

  if (
    document?.workflow === "requestFromOthers" &&
    documentStatus === "draft"
  ) {
    return (
      <div>
        Document still in draft mode, please add recipient first in document tab
      </div>
    );
  }

  return (
    <Timeline mode="left">
      {document?.Recipient?.map((item) => (
        <Timeline.Item
          key={item?.id}
          color={item?.signatory_status === "PENDING" ? "red" : "green"}
          dot={
            item?.signatory_status === "PENDING" ? (
              <ClockCircleOutlined style={{ fontSize: "16px" }} />
            ) : null
          }
        >
          <Space style={{ marginRight: 10 }}>
            <Avatar src={item?.recipient_json?.fileDiri?.foto} />
            <Typography.Text>{item?.recipient_json?.nama}</Typography.Text>
          </Space>
          <Tag>{upperCase(item?.role)}</Tag>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

function Recipients() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useQuery(
    ["document-recipients", id],
    () => getRecipinents(id),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <DetailDocumentHeader title="Recipients" tabActiveKey="recipients">
      <Container>
        <Card title="Recipient" loading={isLoading}>
          <Space
            align="start"
            style={{
              marginBottom: 10,
            }}
          >
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
          <Recipient document={data} />
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
