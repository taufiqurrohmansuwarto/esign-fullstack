import DocumentCollectiveSignList from "@/components/DocumentCollective/DocumentCollectiveSignList";
import UserLayout from "@/components/UserLayout";
import { Card } from "antd";

const { default: PageContainer } = require("@/components/pro/PageContainer");

const DocumentCollectiveConfirmation = () => {
  return (
    <PageContainer title="Document Collectives">
      <Card>
        <DocumentCollectiveSignList />
      </Card>
    </PageContainer>
  );
};

DocumentCollectiveConfirmation.getLayout = (page) => {
  return (
    <UserLayout active="/user/document-collectives/confirmations">
      {page}
    </UserLayout>
  );
};

DocumentCollectiveConfirmation.Auth = {
  role: "USER",
};

export default DocumentCollectiveConfirmation;
