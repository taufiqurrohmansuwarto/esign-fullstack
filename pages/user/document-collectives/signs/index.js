import DocumentCollectiveSignList from "@/components/DocumentCollective/DocumentCollectiveSignList";
import UserLayout from "@/components/UserLayout";
import { Card } from "antd";

const { default: PageContainer } = require("@/components/pro/PageContainer");

const DocumentCollectivesSigns = () => {
  return (
    <PageContainer title="Document Collectives">
      <Card>
        <DocumentCollectiveSignList />
      </Card>
    </PageContainer>
  );
};

DocumentCollectivesSigns.getLayout = (page) => {
  return <UserLayout active="/user/document-collectives">{page}</UserLayout>;
};

DocumentCollectivesSigns.Auth = {
  role: "USER",
};

export default DocumentCollectivesSigns;
