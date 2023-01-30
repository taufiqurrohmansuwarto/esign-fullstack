import UserLayout from "@/components/UserLayout";
import { Card } from "antd";

const { default: PageContainer } = require("@/components/pro/PageContainer");

const DocumentCollectivesSign = () => {
  return (
    <PageContainer title="Document Collectives">
      <Card>Ini adalah document colletives</Card>
    </PageContainer>
  );
};

DocumentCollectivesSign.getLayout = (page) => {
  return <UserLayout active="/user/document-collectives">{page}</UserLayout>;
};

DocumentCollectivesSign.Auth = {
  role: "USER",
};

export default DocumentCollectivesSign;
