import DocumentsList from "@/components/DocumentsList";
import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";

const Archived = () => {
  return (
    <PageContainer title="Archieved">
      <DocumentsList type="archived" />
    </PageContainer>
  );
};

Archived.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

Archived.Auth = {
  role: "USER",
};

export default Archived;
