import DocumentsList from "@/components/DocumentsList";
import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";

const Pending = () => {
  return (
    <PageContainer title="Pending">
      <DocumentsList type="pending" />
    </PageContainer>
  );
};

Pending.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

Pending.Auth = {
  role: "USER",
};

export default Pending;
