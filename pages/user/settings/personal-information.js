import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Col,
  Form,
  Input,
  Row,
  Card,
  Divider,
  Skeleton,
  Typography,
} from "antd";
import { detailUser, getBsreProfile } from "services/users.services";

const BsreInformation = ({ data, loading }) => {
  if (data === null) {
    return;
  }

  const [form] = Form.useForm();

  return (
    <Skeleton loading={loading}>
      <Typography.Title>
        <Typography.Text strong>BSRE Information</Typography.Text>
      </Typography.Title>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          nama: data?.data?.nama,
          nik: data?.data?.nip,
          status_user: data?.data?.status_user,
          email: data?.data?.email,
        }}
      >
        <Form.Item id="nama" name="nama" label="Nama">
          <Input readOnly />
        </Form.Item>
        <Form.Item id="nik" name="nik" label="NIK">
          <Input readOnly />
        </Form.Item>
        <Form.Item id="status_user" name="status_user" label="Status User">
          <Input readOnly />
        </Form.Item>
        <Form.Item id="email" name="email" label="Email">
          <Input readOnly />
        </Form.Item>
      </Form>
    </Skeleton>
  );
};

const PersonalInformation = () => {
  const { data, isLoading } = useQuery(["user"], () => detailUser(), {
    refetchOnWindowFocus: false,
  });

  const { data: dataBsre, isLoading: isLoadingBsre } = useQuery(
    ["data-bsre"],
    () => getBsreProfile(),
    {
      refetchOnWindowFocus: false,
    }
  );

  const [form] = Form.useForm();

  return (
    <PageContainer title="Personal Information">
      <Card loading={isLoading}>
        <Row gutter={[16, 32]}>
          <Col span={8}>
            <Typography.Title>
              <Typography.Text strong>SIMASTER Information</Typography.Text>
            </Typography.Title>
            <Avatar size={80} src={data?.fileDiri?.foto} />
            <Form form={form} initialValues={data} layout="vertical">
              <Form.Item id="username" name="nama" label="Nama">
                <Input readOnly />
              </Form.Item>
              <Form.Item name="skpd" label="Perangkat Daerah">
                <Input.TextArea readOnly />
              </Form.Item>
              <Form.Item name="jabatan" label="Jabatan">
                <Input readOnly />
              </Form.Item>
              <Form.Item name="golongan" label="Golongan">
                <Input readOnly />
              </Form.Item>
              <Form.Item name="pangkat" label="Pangkat">
                <Input readOnly />
              </Form.Item>
            </Form>
          </Col>
          <Col span={1}></Col>
          <Col span={8}>
            <BsreInformation data={dataBsre} loading={isLoadingBsre} />
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

PersonalInformation.getLayout = (page) => {
  return (
    <UserLayout active="/user/settings/personal-information">{page}</UserLayout>
  );
};

PersonalInformation.Auth = {
  role: "USER",
};

export default PersonalInformation;
