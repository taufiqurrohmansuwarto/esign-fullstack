import { capitalize } from "@/lib/client-utils";
import { detailDocument } from "@/services/users.services";
import { DownloadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Dropdown, Space, Tag } from "antd";
import { useRouter } from "next/router";
import PageContainer from "./pro/PageContainer";

const Content = ({ data }) => {
  return (
    <>
      <Space>
        {data?.filename}
        <Tag>{capitalize(data?.workflow)}</Tag>
        <Tag>{capitalize(data?.status)}</Tag>
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
    ["document-detail", router.query.id],
    () => detailDocument(router.query.id),
    {
      enabled: !!router.query.id,
      refetchOnWindowFocus: false,
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
        <div key="1">
          {data && (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: (
                      <a
                        download
                        alt="alt text"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={data?.urls?.initialDocUrl}
                      >
                        Initial Document
                      </a>
                    ),
                  },
                  {
                    key: "2",
                    label: (
                      <a
                        href={data?.urls?.signDocUrl}
                        alt="alt text"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Sign Document
                      </a>
                    ),
                    disabled: data?.urls?.signDocUrl !== null ? false : true,
                  },
                  {
                    key: "3",
                    label: "History Document",
                  },
                ],
              }}
            >
              <Button icon={<DownloadOutlined />} type="primary">
                Download
              </Button>
            </Dropdown>
          )}
        </div>,
      ]}
    >
      {children}
    </PageContainer>
  );
};

export default DetailDocumentHeader;
