import Container from "@/components/Container";
import DocumentsList from "@/components/DocumentsList";
import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";

const AllDocuments = () => {
  return (
    <PageContainer title="All Document">
      <Container>
        <DocumentsList type="all" />
      </Container>
    </PageContainer>
  );
};

AllDocuments.Auth = {
  role: "USER",
};

AllDocuments.getLayout = (page) => {
  return <UserLayout active="/user/documents/all">{page}</UserLayout>;
};

export default AllDocuments;
