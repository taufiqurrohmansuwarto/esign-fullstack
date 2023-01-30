import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";
import { getBsreProfile } from "@/services/users.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Modal } from "antd";
import { forgotPassphrase } from "services/users.services";

const ChangePassword = () => {
  const { data, isLoading } = useQuery(["data-bsre"], () => getBsreProfile(), {
    refetchOnWindowFocus: false,
  });

  const { mutate: reset, isLoading: loadingReset } = useMutation(
    (data) => forgotPassphrase(data),
    {
      onSuccess: () => {
        Modal.success({
          title: "Success",
          content: "Please check your email",
        });
      },
    }
  );

  const handleReset = () => {};

  return (
    <PageContainer title="Change Password">
      <Card loading={isLoading}>
        {JSON.stringify(data?.data?.email)}
        <Button onClick={handleReset}>Reset Password</Button>
      </Card>
    </PageContainer>
  );
};

ChangePassword.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

ChangePassword.Auth = {
  role: "USER",
};

export default ChangePassword;
