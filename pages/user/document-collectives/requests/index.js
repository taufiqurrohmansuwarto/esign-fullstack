import UserLayout from "@/components/UserLayout";
import { Card } from "antd";

const { default: PageContainer } = require("@/components/pro/PageContainer");

const DocumentCollectives = () => {
  return (
    <PageContainer title="Document Collectives">
      <Card>Ini adalah document colletives</Card>
    </PageContainer>
  );
};

DocumentCollectives.getLayout = (page) => {
  return <UserLayout active="/user/document-collectives">{page}</UserLayout>;
};

DocumentCollectives.Auth = {
  role: "USER",
};

export default DocumentCollectives;
