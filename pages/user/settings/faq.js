import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";
import { Card } from "antd";

const Faq = () => {
  return (
    <PageContainer title="Frequently Asked Question">
      <Card>hello world</Card>
    </PageContainer>
  );
};

Faq.Auth = {
  role: "USER",
};

Faq.getLayout = (page) => {
  return (
    <UserLayout active="/user/settings/digital-certificate">{page}</UserLayout>
  );
};

export default Faq;
