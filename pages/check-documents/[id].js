import { formatDate, toKB, upperCaseFirst } from "@/lib/client-utils";
import { checkDocumentById } from "@/services/public.services";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Card,
  Descriptions,
  Empty,
  Layout,
  Result,
  Skeleton,
  Space,
  Table,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const BSREInfo = ({ data }) => {
  return (
    <Card title="BSRE">
      <Descriptions title="BSRE Information">
        <Descriptions.Item label="Document name">
          {data?.nama_dokumen}
        </Descriptions.Item>
        <Descriptions.Item label="Total Signatures">
          {data?.jumlah_signature}
        </Descriptions.Item>
        <Descriptions.Item label="Summary">{data?.summary}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="BSRE Information Details">
        {data?.details?.map((item) => (
          <>
            <Descriptions.Item label="Signer Name">
              {item?.info_signer?.signer_name}
            </Descriptions.Item>
            <Descriptions.Item label="Reason">
              {item?.signature_document?.reason}
            </Descriptions.Item>
          </>
        ))}
      </Descriptions>
    </Card>
  );
};

const EsignInformation = ({ data }) => {
  const columns = [
    {
      title: "Recipient Information",
      dataIndex: "recipient_name",
      render: (_, row) => (
        <Space>
          <Avatar src={row?.recipient_json?.fileDiri?.foto} />
          <div>{row?.recipient_json?.nama}</div>
        </Space>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (_, row) => upperCaseFirst(row?.role),
    },
    {
      title: "Signatory Status",
      dataIndex: "signatory_status",
    },
    {
      title: "Approval Date",
      dataIndex: "approval_date",
      render: (_, row) => formatDate(row?.approval_date),
    },
  ];

  return (
    <Card title="Esign Information">
      <Descriptions title="Filename">
        <Descriptions.Item label="Filename">{data?.filename}</Descriptions.Item>
        <Descriptions.Item label="Total Pages">
          {data?.document_pages}
        </Descriptions.Item>
        <Descriptions.Item label="Size">
          {toKB(data?.size)} KB
        </Descriptions.Item>
      </Descriptions>
      <Table
        style={{ marginTop: 10 }}
        columns={columns}
        pagination={false}
        dataSource={data?.Recipient}
      />
    </Card>
  );
};

const Checker = ({ data }) => {
  if (data === null) {
    return <Empty />;
  } else {
    return (
      <>
        <Result
          status="success"
          title="Document Found"
          subTitle={
            <Link href={data?.url} passHref>
              Download File
            </Link>
          }
        />
        <Space direction="vertical" size={20}>
          <BSREInfo data={data?.bsre} />
          <EsignInformation data={data?.document} />
        </Space>
      </>
    );
  }
};

const CheckDocumentById = () => {
  const router = useRouter();
  const id = router?.query?.id;

  const { data, isLoading } = useQuery(
    ["check-documents", id],
    () => checkDocumentById(id),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Skeleton loading={isLoading}>
      <Layout style={{ padding: 32, minHeight: "100vh" }}>
        <Checker data={data} />
      </Layout>
    </Skeleton>
  );
};

export default CheckDocumentById;
