import DocumentsList from "@/components/DocumentsList";
import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";

const Done = () => {
  return (
    <PageContainer title="Done">
      <DocumentsList type="done" />
    </PageContainer>
  );
};

Done.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

Done.Auth = {
  role: "USER",
};

export default Done;
