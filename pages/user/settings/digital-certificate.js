import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";
import { getBsreProfile } from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";
import { Card, Form, Input, Result, Skeleton } from "antd";

const DigitalCertificate = () => {
  const { data, isLoading } = useQuery(["data-bsre"], () => getBsreProfile(), {
    refetchOnWindowFocus: false,
  });

  if (data === null || !data) {
    return (
      <Result
        status={404}
        title="Digital Certificate Not Found"
        subTitle="Please contact your administrator to get your digital certificate. "
      />
    );
  }

  const Sertifikat = ({ data, loading }) => {
    const [form] = Form.useForm();

    return (
      <Skeleton loading={loading}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            serial: data?.serial,
            berlaku_sampai: data?.berlaku_sampai,
            jenis_sertifikat: data?.jenis_sertifikat,
            sertifikat: data?.sertifikat,
            subject: data?.subject_dn,
          }}
        >
          <Form.Item label="Subject" name="subject">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Serial" name="serial">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Berlaku Sampai" name="berlaku_sampai">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Jenis Sertifikat" name="jenis_sertifikat">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Sertifikat" name="sertifikat">
            <Input.TextArea rows={10} readOnly />
          </Form.Item>
        </Form>
      </Skeleton>
    );
  };

  return (
    <PageContainer title="Digital Certificate">
      <Card loading={isLoading}>
        <Sertifikat loading={isLoading} data={data?.data?.sertifikat?.[0]} />
      </Card>
    </PageContainer>
  );
};

DigitalCertificate.Auth = {
  role: "USER",
};

DigitalCertificate.getLayout = (page) => {
  return (
    <UserLayout active="/user/settings/digital-certificate">{page}</UserLayout>
  );
};

export default DigitalCertificate;
