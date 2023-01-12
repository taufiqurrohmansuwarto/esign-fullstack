import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";
import Link from "next/link";
import { listUrl } from "@/lib/client-utils";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Card,
  Col,
  Divider,
  Row,
  Skeleton,
  Typography,
  Space,
} from "antd";
import { detailUser } from "services/users.services";

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
          <p>{data?.nip}</p>
        </Row>
      </Col>
    </Row>
  );
};

const StatusUser = () => {
  return <div>Status user</div>;
};

const Statistic = () => {
  return <div>Ini adalah statistic</div>;
};

const ListItems = () => {
  return (
    <>
      {listUrl?.map((item) => {
        return (
          <div style={{ paddingTop: 10, paddingBottom: 10 }}>
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
  const { data, isLoading } = useQuery(["user"], () => detailUser());

  return (
    <PageContainer title="Dashboard">
      <Card bordered={false}>
        <Skeleton loading={isLoading}>
          <HeaderUser data={data} />
          <Divider />
          <StatusUser />
          <Divider />
          <Statistic />
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
