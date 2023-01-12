import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";
import { stampInfo } from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";
import { Card, Image, Skeleton } from "antd";

const Signatures = () => {
  const { data, isLoading } = useQuery(["stamps"], () => stampInfo(), {
    refetchOnWindowFocus: false,
  });

  return (
    <PageContainer title="Signatures">
      <Card loading={isLoading}>
        <Image src={`data:image/jpeg;base64,${data?.image}`} />
      </Card>
    </PageContainer>
  );
};

Signatures.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

Signatures.Auth = {
  role: "USER",
};

export default Signatures;
