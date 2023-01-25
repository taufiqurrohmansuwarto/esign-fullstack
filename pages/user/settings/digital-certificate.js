import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";
import { Card, Result } from "antd";

const DigitalCertificate = () => {
  return (
    <PageContainer title="Digital Certificate">
      <Card>
        <Result
          status={404}
          title="Not Ready"
          subTitle="Feature is not ready"
        />
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
