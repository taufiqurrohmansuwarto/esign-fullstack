import DocumentsList from "@/components/DocumentsList";
import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";

const Expired = () => {
  return (
    <PageContainer title="Expired">
      <DocumentsList type="expired" />
    </PageContainer>
  );
};

Expired.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

Expired.Auth = {
  role: "USER",
};

export default Expired;
