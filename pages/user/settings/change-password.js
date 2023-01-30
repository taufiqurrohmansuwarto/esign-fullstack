import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";
import { getBsreProfile } from "@/services/users.services";
import { KeyOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Input, message, Modal, Typography, Space } from "antd";
import { useState } from "react";
import { forgotPassphrase } from "services/users.services";

const ModalConfirmation = ({ open, onCancel }) => {
  const { mutate: reset, isLoading: loadingReset } = useMutation(
    (data) => forgotPassphrase(data),
    {
      onSuccess: () => {
        message.success("Password reset successfully, please check your email");
        onCancel();
      },
      onError: (error) => {
        message.error(error?.response?.data?.message);
      },
    }
  );

  return (
    <Modal
      onOk={reset}
      confirmLoading={loadingReset}
      title="Reset Password"
      open={open}
      onCancel={onCancel}
    >
      <Typography.Text>
        Are you sure you want to reset your password? You will receive an email
      </Typography.Text>
    </Modal>
  );
};

const ChangePassword = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const handleCancel = () => setShowModal(false);

  const { data, isLoading } = useQuery(["data-bsre"], () => getBsreProfile(), {
    refetchOnWindowFocus: false,
  });

  return (
    <PageContainer title="Change Password">
      <ModalConfirmation open={showModal} onCancel={handleCancel} />

      <Card loading={isLoading}>
        {data ? (
          <>
            <div>
              <Typography.Paragraph>
                You can reset your password by clicking the button below
              </Typography.Paragraph>
            </div>
            <Space direction="vertical">
              <Input style={{ width: 300 }} value={data?.data?.email} />
              <Button icon={<KeyOutlined />} onClick={openModal} type="primary">
                Reset Password
              </Button>
            </Space>
          </>
        ) : (
          <Typography.Text>Not found</Typography.Text>
        )}
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
