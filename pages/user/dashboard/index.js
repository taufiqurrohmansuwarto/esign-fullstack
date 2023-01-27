import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";
import { alertHeader, listUrl } from "@/lib/client-utils";
import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Skeleton,
  Space,
  Statistic,
  Typography,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { detailUser, getDashboard } from "services/users.services";

// HEADER USER INFORMATION
const HeaderUser = ({ data }) => {
  return (
    <Row gutter={[32, 16]}>
      <Col>
        <Avatar src={data?.fileDiri?.foto} size={80} />
      </Col>
      <Col>
        <Row>
          <Typography.Title level={4}>
            Welcome Back, {data?.nama || "Tidak ada data"}
          </Typography.Title>
        </Row>
        <Row>
          <Typography.Text>{data?.jabatan}</Typography.Text>
        </Row>
        <Row>
          <Typography.Text>{data?.nip}</Typography.Text>
        </Row>
        <Row>
          <Typography.Text>{data?.skpd}</Typography.Text>
        </Row>
      </Col>
    </Row>
  );
};

const StatusUser = ({ data }) => {
  const status_bsre = data?.status_bsre;
  const { type, text } = alertHeader(status_bsre);

  return (
    <>
      <Typography.Title level={5} underline>
        BSrE Status
      </Typography.Title>
      <Alert type={type} message={text} showIcon />
    </>
  );
};

const StatisticUser = () => {
  const router = useRouter();

  const gotoDraftDocument = () => router.push("/user/documents/pending");

  const { data, isLoading } = useQuery(["user-dashboard"], () =>
    getDashboard()
  );

  return (
    <Skeleton loading={isLoading}>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic
            title="Waiting Document"
            value={data?.document_type?.document_draft}
          />
          <Button
            onClick={gotoDraftDocument}
            style={{ marginTop: 15 }}
            type="primary"
          >
            View
          </Button>
        </Col>
        <Col span={8}>
          <Statistic
            title="Document Done"
            value={data?.document_type?.document_completed}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="All Document"
            value={data?.document_type?.all_documents}
          />
        </Col>
      </Row>
    </Skeleton>
  );
};

const ListItems = () => {
  return (
    <>
      {listUrl?.map((item) => {
        return (
          <div style={{ paddingTop: 10, paddingBottom: 10 }} key={item?.url}>
            <Space>
              <Link href={item?.url}>
                {item?.icon} {item?.text}
              </Link>
            </Space>
          </div>
        );
      })}
    </>
  );
};

function Dashboard() {
  const { data, isLoading } = useQuery(["user"], () => detailUser(), {
    refetchOnWindowFocus: false,
  });

  return (
    <PageContainer title="Dashboard">
      <Card bordered={false}>
        <Skeleton
          active
          loading={isLoading}
          avatar
          paragraph={{
            rows: 4,
          }}
        >
          <HeaderUser data={data} />
          <Divider />
          <StatusUser data={data} />
          <Divider />
          <StatisticUser />
          <Divider />
          <ListItems />
        </Skeleton>
      </Card>
    </PageContainer>
  );
}

Dashboard.Auth = {
  role: "USER",
};

Dashboard.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Dashboard;
