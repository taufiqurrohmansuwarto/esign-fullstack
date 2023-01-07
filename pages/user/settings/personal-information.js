import UserLayout from "@/components/UserLayout";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Col, Form, Input, Row, Skeleton } from "antd";
import { detailUser } from "services/users.services";

const PersonalInformation = () => {
  const { data, isLoading } = useQuery(["user"], () => detailUser());

  const [form] = Form.useForm();

  if (isLoading) {
    return <div>loading..</div>;
  }

  return (
    <Skeleton loading={isLoading}>
      <Row>
        <Col span={8}>
          <Avatar size={160} src={data?.fileDiri?.foto} />
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
        <Col span={4}></Col>
      </Row>
    </Skeleton>
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
