import DocumentsList from "@/components/DocumentsList";
import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";

const Draft = () => {
  return (
    <PageContainer title="Draft">
      <DocumentsList type="draft" />
    </PageContainer>
  );
};

Draft.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

Draft.Auth = {
  role: "USER",
};

export default Draft;
