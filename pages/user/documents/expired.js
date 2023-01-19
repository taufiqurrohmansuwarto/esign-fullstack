import DocumentsList from "@/components/DocumentsList";
import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";
import { Result } from "antd";

const Expired = () => {
  return (
    <PageContainer title="Expired">
      <Result
        status={404}
        title="Under Construction"
        subTitle="This features is not implemented yet"
      />
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
