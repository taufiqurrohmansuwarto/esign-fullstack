import UserLayout from "@/components/UserLayout";
import { Card } from "antd";

const { default: PageContainer } = require("@/components/pro/PageContainer");

const DocumentCollectivesDetail = () => {
  return (
    <PageContainer title="Detail Document Collectives">
      <Card>Ini adalah document colletives detail</Card>
    </PageContainer>
  );
};

DocumentCollectivesDetail.getLayout = (page) => {
  return <UserLayout active="/user/document-collectives">{page}</UserLayout>;
};

DocumentCollectivesDetail.Auth = {
  role: "USER",
};

export default DocumentCollectivesDetail;
