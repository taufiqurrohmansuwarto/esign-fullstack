import DocumentsList from "@/components/DocumentsList";
import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";

const Rejected = () => {
  return (
    <PageContainer title="Rejected">
      <DocumentsList type="rejected" />
    </PageContainer>
  );
};

Rejected.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

Rejected.Auth = {
  role: "USER",
};

export default Rejected;
